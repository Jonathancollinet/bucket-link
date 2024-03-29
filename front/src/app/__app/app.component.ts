import { Component, OnInit, OnDestroy, NgZone, ViewChild, HostListener } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, NavigationStart  } from '@angular/router';

import { TopBarComponent, KeyboardHelperComponent, SharedService } from '../core';
import { Bucket, Link } from '../core/models';
import { AuthService } from '../core/services/auth.service';
import { BucketService } from '../core/services/bucket.service';
import { BUCKET_COLORS } from '../core/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  public buckets: Array<Bucket> = [];
  public uncategorizedBucket: Bucket;
  public uncategorizedLinks: Array<Link>;
  public _layout = 0; // For Sidebar
  public minimalWidth = "993px";  // For Sidebar
  public selectedBucket: Bucket;
  public classAuthState: string = 'AuthOFF'; // FOR general CSS
  public _ribbonVisibility: boolean;

  private _opened: boolean = false;
  private _disconnected: boolean; 
  private _currentUser;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = true;
  private _modeNum: number = 0;
  // Subscribs
  private _subRouter;
  private _subAuth;
  private _subBuckets;
  private _subULinks;
  private _subBucketsReload;
  private _subLogged;
  

  @ViewChild(TopBarComponent) topbar: TopBarComponent;
  @ViewChild(KeyboardHelperComponent) keyboardHelper: KeyboardHelperComponent;

  constructor(
    private _zone: NgZone,
    private _dragula: DragulaService,
    private _router: Router,
    private _auth: AuthService,
    private _shared: SharedService,
    private _bucket: BucketService
  ) {
    // Subscribers
    this._dragula.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
     this._subRouter = this._router.events.subscribe(event => {
      if  (event instanceof NavigationStart) {
        if (event.url.indexOf('/bucket/') > -1 || event.url.indexOf('/buckets') > -1) {
          this.setRibbonVisibility(true);
        } else {
          this.setRibbonVisibility(false);
        }
        if (event.url.indexOf('/bucket/') > -1) {
          this.selectedBucket = this.buckets[event.url.split('/').pop()]
        } else {
          this.selectedBucket = null;
        }
      }
      if  (event instanceof NavigationStart && this._layout) {
        this._closeSidebar();
      }
    });
    this._subLogged = this._shared.get('hasBeenLogged').subscribe((state) => {
      this.setAuthStateCSSClass('AuthON');
      this._disconnected = false;
      this.enableResponsive();
      this.getBuckets();
      this.getUncategorizedLinks();
    });
    this._subBucketsReload = this._shared.get('BucketsShouldBeReloaded').subscribe((state) => {
      if (parseInt(state, 10)) {
        this.getBuckets();
      } else {
        this.getUncategorizedLinks();
      }
    });
    this._shared.get('selectedBucket').subscribe((state: number) => {
       if (state) {
          this._bucket.setBucketIDForPost(state);
          this._bucket.setBucketName(this.getBucketByID(state).name);
          this._shared.setData('selectedBucketColor', this.getBucketByID(state).color);
        } else {
          this._bucket.setBucketIDForPost(null);
          this._shared.setData('selectedBucketColor',  BUCKET_COLORS[0].code)
        }
    });
  }

  ngOnInit() {
    this.enableResponsive();
    if (localStorage.getItem('tkn')) {
      // Subscriber
      this._subAuth = this._auth.pingAuth().subscribe(
        (data)=> {
            this.setAuthStateCSSClass('AuthON');
            this._shared.get('currentUser').subscribe(d => this._currentUser = d);
            this._disconnected = false;
            // Subscriber
            this.getBuckets();
            // Subscriber
            this.getUncategorizedLinks();
        }
      );
    } else {
      this._disconnected = true;
      this.setAuthStateCSSClass('AuthOFF');
      this._closeSidebar();
    }
  }

  public getContainerSize(): string {
    return this.isAuth() ? 'calc(100% - 250px)' : '100%';
  }

  private getBuckets() {
    this._subBuckets = this._bucket.getBuckets().subscribe((response) => {
      let tmp =  response.data;
      this.buckets = [];
      tmp.forEach((bucket) => {
        this.buckets.push(new Bucket(bucket.id, bucket.name, bucket.color, bucket.createdAt, bucket.updatedAt, bucket.Links));
      });
    }, (err) => { console.error('getBuckets', err); });
  }

  private getUncategorizedLinks() {
    this._subULinks = this._bucket.getUncategorizedLinks().subscribe((response) => {
      if (this.uncategorizedBucket && this.uncategorizedBucket.Links && this.uncategorizedBucket.Links.length !== response.data.length) {
        this.uncategorizedBucket.Links = response.data;
      } else {
        this.uncategorizedBucket = new Bucket(0, "UNCATEGORIZED", "#37105f", new Date().toString(), new Date().toString(), response.data);
      }
    }, (err) => { console.error('getBuckets', err); });
  }

  private getBucketByID(id: number): Bucket {
    for (var i=0; i < this.buckets.length; i++) {
      if (this.buckets[i].id === id) {
          return this.buckets[i];
      }
    }
  }

  private onDrop(args) {
    let [e, newBucketId] = args;
    let linkId = +[e.className.replace(/[^\d.]/g,'')];
    newBucketId = +[newBucketId.className.replace("links-container for-bucket-", "")];
    if (parseInt(newBucketId, 10)) {
      this._bucket.patchLink(linkId, { bucketId: newBucketId }).subscribe((resp) => {
        this._shared.setData('BucketsShouldBeReloaded', newBucketId);
        this._shared.setData('BucketsPageShouldBeReloaded', newBucketId);
      }, (err) => {console.error('patch link', err)})
    } else if (newBucketId === 0) {
      this._bucket.patchLink(linkId, { bucketId: null }).subscribe((resp) => {
         this._shared.setData('BucketsShouldBeReloaded', null);
         this._shared.setData('BucketsPageShouldBeReloaded', null);
      }, (err) => {console.error('patch link', err)})
    }
  }

  public getCountUncategorized(): number {
    return this.uncategorizedBucket ? this.uncategorizedBucket.Links.length : 0;
  }
  public getStateStyle(): boolean {
    return this._disconnected && !this.isAuth();
  }

  private enableResponsive(): void {
    let mq = window.matchMedia(`screen and (min-width: ${this.minimalWidth})`);
    // init
    mq.matches ? this.desktopMode() : this.mobileMode();
    // listen for change
    mq.addListener((matchMedia) => {
      this._zone.run(() => { // force update
        matchMedia.matches ? this.desktopMode() : this.mobileMode();
      });
    });
  }

  public setAuthStateCSSClass(state): void {
    document.body.className = state;
    this.classAuthState = state;
  }

  public getAuthStateCSSClass(): string {
    return this.classAuthState;
  }

  public isAuth(): boolean {
    return this._auth.isLoggedIn();
  }

  public logout(): void {
    this._disconnected = true;
    this.setAuthStateCSSClass('AuthOFF');
    this._auth.logout().subscribe();
  }

   private desktopMode(): void {
    this._openSidebar();
    this._modeNum = 1;
    this._closeOnClickOutside = false;
    this._showBackdrop = false;
    this._layout = 0;
  }

  private mobileMode(): void {
    this._closeSidebar();
    this._modeNum = 0;
    this._closeOnClickOutside = true;
    this._showBackdrop = true;
    this._layout = 1;
  }

  public setRibbonVisibility(state: boolean): boolean {
    this._ribbonVisibility = state;
    return this._ribbonVisibility;
  }

  public getRibbonVisibility(): boolean {
    return this._ribbonVisibility;
  }

  private geContainerSize(): string {
    return this.isAuth() ? 'calc(100% - 250px)' : "100%";
  }

  private _closeSidebar(): void {
    this._opened = false;
  }

  private _openSidebar(): void {
    this._opened = true;
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  public navigateToBucket(id: number): void {
    this._shared.setData('selectedBucketColor', this.getBucketByID(id).color);
    var currentUrl = `/bucket/${id}`;
    var refreshUrl = currentUrl.indexOf(`/bucket${id}`) > -1 ? `/bucket${id}` : `/buckets`;
    this._router.navigateByUrl(refreshUrl).then(() => this._router.navigateByUrl(currentUrl));
  }

  public navigateToBuckets(): void {
    this._shared.setData('selectedBucketColor', BUCKET_COLORS[0].code);
    this._router.navigate(['/buckets']);
  }

  public navigateToBoards(): void {
      this._router.navigate(['/boards']);
  }

  public navigateToLinks(): void {
      this._router.navigate(['/links']);
  }

  public navigateToProfile(): void {
      this._router.navigate(['/profile']);
  }

  public navigateToRegister() {
    this._router.navigate(['/register']);
  }

  public navigateToLogin() {
    this._router.navigate(['/login']);
  }


  public setSidebarHidden(): string {
    return (this._auth.isLoggedIn() && this._layout === 0) ? 'bucketlist-sidebar' : 'bucketlist-sidebar hidden';
  }


  // Global shortcut
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 65) { // CTRL + SHIFT + A
      this.topbar.focusAddInput()
    } else if (e.ctrlKey && e.shiftKey && e.keyCode === 72) { // CTRL + SHIFT + H
      !this.keyboardHelper.getOpened() ? this.keyboardHelper.setOpened(true) : this.keyboardHelper.setOpened(false);
    }
  }

  @HostListener('click', ['$event']) 
  onClick(e) {
   if (this._auth.isLoggedIn() && e.target.className) {
    if (e.target.className.indexOf && e.target.className != 'click-target'
      && e.target.className != 'fa fa-clone'
      && e.target.className != 'bucket-action' && e.target.className.indexOf('form-control') != 0) {
      // TODO: Need reformat via bucketService
      this._bucket.setBucketName(null);
      this._shared.setData('selectedBucket', null);
      this._shared.setData('selectedBucketColor',  BUCKET_COLORS[0].code);
      this._bucket.setBucketIDForPost(null);
    } else if (e.target.className == 'click-target' ||  e.target.className == 'bucket-action') {
      e.preventDefault();
      e.stopPropagation();
    }
   }
  }

  ngOnDestroy(): void {
    if (this._subRouter) this._subRouter.unsubscribe();
    if (this._subAuth) this._subAuth.unsubscribe();
    if (this._subBuckets) this._subBuckets.unsubscribe();
    if (this._subULinks) this._subULinks.unsubscribe();
    if (this._subLogged) this._subLogged.unsubscribe();
    if (this._subBucketsReload) this._subBucketsReload.unsubscribe();
  }

}

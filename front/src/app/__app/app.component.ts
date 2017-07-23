import { Component, NgZone, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';

import { TopBarComponent, SharedService } from '../core';
import { Bucket, Link } from '../core/models';
import { AuthService } from '../core/services/auth.service';
import { BucketService } from '../core/services/bucket.service';
import { BUCKET_COLORS } from '../core/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public buckets: Array<Bucket> = [];
  public uncategorizedBucket: Bucket;
  public uncategorizedLinks: Array<Link>;

  private _opened: boolean = false;
  private _disconnected: boolean;
  public _layout = 0;
  public selectedBucket: Bucket;
  public classAuthState: string = 'AuthOFF';
  private _currentUser;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = true;
  private _modeNum: number = 0;
  public minimalWidth = "993px";

  @ViewChild(TopBarComponent) topbar: TopBarComponent;

  constructor(
    private _zone: NgZone,
    private _router: Router,
    private _auth: AuthService,
    private _shared: SharedService,
    private _bucket: BucketService
  ) {
    this.enableResponsive();

    this._router.events.subscribe(event => {
      if  (event instanceof NavigationStart) {
        if (event.url.indexOf('/bucket/') > -1) {
          this.selectedBucket = this.buckets[event.url.split('/').pop()]
        } else {
          this.selectedBucket = null;
        }
      }
      if  (event instanceof NavigationStart && this._layout) {
        this._closeSidebar();
      }
    })

    if (localStorage.getItem('tkn')) {
      this._auth.pingAuth().subscribe(
        (data)=> {
            this.setAuthStateCSSClass('AuthON');
            this._shared.get('currentUser').subscribe(d => this._currentUser = d);
            this._bucket.getBuckets().subscribe((response) => {
              this._disconnected = false;
              let tmp =  response.data;
              this.buckets = [];
              tmp.forEach((bucket) => {
                this.buckets.push(new Bucket(bucket.id, bucket.name, bucket.color, bucket.createdAt, bucket.updatedAt, bucket.Links));
              });
            }, (err) => { console.error('getBuckets', err); });
            this._bucket.getUncategorizedLinks().subscribe((response) => {
              this.uncategorizedBucket = new Bucket(0, "UNCATEGORIZED", "#37105f", new Date().toString(), new Date().toString(), response.data);
            }, (err) => { console.error('getBuckets', err); });
                  }
          );
    } else {
      this._disconnected = true;
      this.setAuthStateCSSClass('AuthOFF');
       this._closeSidebar();
    }
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
      }, (err) => {console.error('patch link')})
    } else if (newBucketId === 0) {
      this._bucket.patchLink(linkId, { bucketId: null }).subscribe((resp) => {
      }, (err) => {console.error('patch link')})
    }
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

   public navigateToLinks(): void {
      this._router.navigate(['/links']);
  }

  public navigateToProfile(): void {
      this._router.navigate(['/profile']);
  }

  public setSidebarHidden(): string {
    return (this._auth.isLoggedIn() && this._layout === 0) ? 'bucketlist-sidebar' : 'bucketlist-sidebar hidden';
  }


  // Global shortcut
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // TO CHANGE, CTRL + SHIFT + A
    if (e.ctrlKey && e.shiftKey && e.keyCode === 65) {
      this.topbar.focusAddInput()
    }
  }

}

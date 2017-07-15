import { Component, NgZone, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';

import { TopBarComponent, SharedService } from '../core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  private _opened: boolean = false;
  private _disconnected: boolean;
  public _layout = 0;
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
    private _shared: SharedService
  ) {
    this.enableResponsive();

    this._router.events.subscribe(event => {
      if  (event instanceof NavigationStart && this._layout) {
        this._closeSidebar();
      }
    })

    if (localStorage.getItem('tkn')) {
      this._auth.pingAuth().subscribe(
        (data)=> {
            this._disconnected = false;
            this._shared.get('currentUser').subscribe(d => this._currentUser = d);
          }
      );
    } else {
      this._disconnected = true;
       this._closeSidebar();
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

  public isAuth(): boolean {
    return this._auth.isLoggedIn();
  }

  public logout(): void {
    this._disconnected = true;
    this._auth.logout().subscribe();
  }

   private desktopMode(): void {
    this._closeSidebar();
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

  public navigateToBuckets(): void {
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

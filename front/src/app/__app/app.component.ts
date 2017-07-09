import { Component, NgZone  } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  private _opened: boolean = false;
  public _layout = 0;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = true;
  private _modeNum: number = 0;
  public minimalWidth = "993px";

  constructor(
    private _zone: NgZone,
    private _router: Router,
    private _auth: AuthService
  ) {
    this.enableResponsive();
    if (localStorage.getItem('tkn')) {
      this._auth.pingAuth().subscribe(
        (data)=> {

          }
      );
    }
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

  public navigateToBuckets(): void {
      this._router.navigate(['/buckets']);
  }

   public navigateToLinks(): void {
      this._router.navigate(['/links']);
  }

}

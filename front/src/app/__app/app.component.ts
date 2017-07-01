import { Component, NgZone  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  private _opened: boolean = false;
  public _layout = 0;
  private _closeOnClickOutside: boolean = false;
  private _modeNum: number = 0;
  public minimalWidth = "601px";

  constructor(private _zone: NgZone, private _router: Router) {
    this.enableResponsive();
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

   private desktopMode(): void {
    this._openSidebar();
    this._modeNum = 1;
    this._closeOnClickOutside = false;
    this._layout = 0;
  }

  private mobileMode(): void {
    this._closeSidebar();
    this._modeNum = 0;
    this._closeOnClickOutside = true;
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

  public disconnect(): void {
      this._router.navigate(['/home']);
  }

}

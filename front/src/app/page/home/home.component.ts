import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  
  public dataSlider: Array<Object> = [];
  private _href: string = location.href;
  private _scrollStarted: boolean = false;

  constructor(private router: Router, private _auth: AuthService) {
    this.dataSlider = [
      {txt: 'Outil de management de link'},
      {txt: 'Connectez vos buckets'},
      {txt: 'Récoltez l\'information à travers le réseau'},
      {txt: 'Déployez votre communication à travers le monde'}
    ];
    if (this._auth.isLoggedIn()) this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    if (this._auth.isLoggedIn()) this.router.navigate(['/login']);
  }

  goToStep() {
    // sorry pour cette manip purement dégueulasse
    // mais chrome a un souci avec scrollIntoView en ce moment
    if (!this._scrollStarted) {
      const destination = document.body.scrollHeight;
      let i = 0, counter = 0;

      while (i < destination) {
        setTimeout(((i) => () => {
          document.getElementsByClassName('ng-sidebar__content')[0].scrollTop = i;
        })(i), counter);
        ++counter;
        i += 2;
        if (i % 6 && i > 1) {
          i -= 1
        }
      }
    }
  }



}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router, private _auth: AuthService) {
    if (this._auth.isLoggedIn()) this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    if (this._auth.isLoggedIn()) this.router.navigate(['/login']);
  }

}
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  constructor(private router: Router, private _auth: AuthService) {
    if (this._auth.isLoggedIn()) this.router.navigate(['/buckets']);
  }

  ngAfterViewInit() {
    if (this._auth.isLoggedIn()) this.router.navigate(['/buckets']);
  }

  handleState(data:any) {
    if (data) this.router.navigate(['/buckets']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgot() {
    this.router.navigate(['/forgot']);
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _auth: AuthService) { }

  ngOnInit() {
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
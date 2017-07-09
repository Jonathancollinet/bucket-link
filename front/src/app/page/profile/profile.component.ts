import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../core';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _currentUser: any;
  private _subCurrentUser: any;

  constructor(private router: Router, private _shared: SharedService) {
  }

  ngOnInit() {
    this._subCurrentUser = this._shared.get('currentUser').subscribe(d => this._currentUser = d);
  }

  ngOnDestroy() {
    if (this._subCurrentUser) this._subCurrentUser.unsubscribe();
  }
}
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Link } from '../../models';

@Component({
  selector: 'core-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  private _link: Link;

  @Input()
  set link(link: Link) {
    if (link) {
      link.createdAt = this.formatDate(link.createdAt);
      this._link = link;
    }
  }

  constructor(private _router: Router) {}

  public formatDate(date): string {
      return moment(date).fromNow();
  }
  
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Link } from '../../core/models';
import { BucketService } from '../../core';

@Component({
  selector: 'page-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  
  links: Array<Link> = [];

  constructor(
    private _router: Router,
    private _bucket: BucketService,
  ) {
     moment.locale('fr');
  }

  ngOnInit() {
    this._bucket.getLinks().subscribe((response) => {
      let tmp =  response.data;
      this.links = [];
      tmp.forEach((link) => {
        this.links.push(new Link(link.id, link.title, link.description, link.createdAt, link.updatedAt, link.bucketId));
      });
    }, (err) => {
      console.error('getBuckets', err);
    });
  }

  public formatDate(date): string {
    return moment(date).fromNow();
  }
  
}
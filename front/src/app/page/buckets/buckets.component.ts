import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { BucketService } from '../../core/services/bucket.service';

@Component({
  selector: 'page-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit {

  buckets: Array<Bucket> = [];
  linksToOrganize: Array<Link> = [];

  constructor(private _router: Router, private _bucket: BucketService) {
    moment.locale('fr');
  }

  ngOnInit(): void {
    this._bucket.getBuckets().subscribe((response) => {
      response.data.forEach((bucket) => {
        bucket.createdAt = this.formatDate(bucket.createdAt);
        this.buckets.push(new Bucket(bucket.id, bucket.name, bucket.color, bucket.createdAt, [new Link(1), new Link(2)]));
      });
    }, (err) => {
      console.error('getBuckets', err);
    });
  }

  handleCreation(): void {
    this.ngOnInit();
  }

  public formatDate(date): string {
      return moment(date).fromNow();
  }

}

class Bucket {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public createdAt: string,
    public links: Array<Link>
  ) {}
}

class Link {
  constructor(
    public id: number
  ) {}
}
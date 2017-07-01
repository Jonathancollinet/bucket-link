import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { BucketService } from '../../core/services/bucket.service';

@Component({
  selector: 'page-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent {

  public buckets: Array<any> = [];

  constructor(private _router: Router, private _bucket: BucketService) {

    moment.locale('fr');

    this._bucket.getBuckets().subscribe((response) => {
      console.log('resp', response);
      this.buckets = response.data;
      this.buckets.forEach((bucket) => {
        bucket.createdAt = this.formatDate(bucket.createdAt);
      });
    }, (err) => {
      console.error('getBuckets', err);
    });

  }

  public formatDate(date): string {
      return moment(date).fromNow();
  }

}
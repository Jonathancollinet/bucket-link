import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { DragulaService } from 'ng2-dragula';

import { Bucket, Link } from '../../core/models';
import { BucketService } from '../../core';

@Component({
  selector: 'page-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit {

  buckets: Array<Bucket> = [];

  constructor(
    private _router: Router,
    private _bucket: BucketService,
    private _dragula: DragulaService
    ) {
    moment.locale('fr');
    this._dragula.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    this._dragula.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
  }

  ngOnInit(): void {
    this._bucket.getBuckets().subscribe((response) => {
      let tmp =  response.data;
      this.buckets = [];
      tmp.forEach((bucket) => {
        bucket.createdAt = this.formatDate(bucket.createdAt);
        this.buckets.push(new Bucket(bucket.id, bucket.name, bucket.color, bucket.createdAt, bucket.updatedAt, bucket.Links));
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

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }
  
  private onDrop(args) {
    let [e, el] = args;
    console.log('Should edit bucketId', e, el, args)
    // do something
  }
  

}




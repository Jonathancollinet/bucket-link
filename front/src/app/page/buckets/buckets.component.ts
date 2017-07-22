import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { DragulaService } from 'ng2-dragula';

import { Bucket, Link } from '../../core/models';
import { BucketService, ToastService } from '../../core';
import { lightenColor, hexToRGB } from '../../core/const';

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
    private _dragula: DragulaService,
    private _toast: ToastService
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

    this._bucket.setBucketName(null);
    this._bucket.getBuckets().subscribe((response) => {
      let tmp =  response.data;
      this.buckets = [];
      tmp.forEach((bucket) => {
        bucket.createdAt = this.formatDate(bucket.createdAt);
        this.buckets.push(new Bucket(bucket.id, bucket.name, bucket.color, bucket.createdAt, bucket.updatedAt, bucket.Links));
      });
    }, (err) => { console.error('getBuckets', err); });
  }

  public handleCreation($event): void {
    this._toast.displaySuccessToast(`bucket ${$event.name} has been added!`);
    this.ngOnInit();
  }

  public handleDeleted(): void {
    this.ngOnInit();
  }

  public getGradient(color): string {
    return hexToRGB(lightenColor(color, .5), .3);
  }
  public getBaseColor(color): string {
    return hexToRGB(color, .1);
  }

  public formatDate(date): string {
      return moment(date).fromNow();
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }
  
  private onDrop(args) {
    let [e, newBucketId] = args;
    let linkId = +[e.className.replace(/[^\d.]/g,'')];
    newBucketId = +[newBucketId.className.replace("links-container for-bucket-", "")];
    if (parseInt(newBucketId, 10)) {
      this._bucket.patchLink(linkId, { bucketId: newBucketId }).subscribe((resp) => {
        console.log('patch link', resp);
      }, (err) => {console.error('patch link')})
    } else if (newBucketId === 0) {
      this._bucket.patchLink(linkId, { bucketId: null }).subscribe((resp) => {
        console.log('patch link', resp);
      }, (err) => {console.error('patch link')})
    }
  }
}




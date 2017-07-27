import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { DragulaService } from 'ng2-dragula';

import { BUCKET_COLORS } from '../../core/const';
import { Bucket, Link } from '../../core/models';
import { AuthService, BucketService, ToastService, SharedService } from '../../core';
import { lightenColor, hexToRGB } from '../../core/const';

@Component({
  selector: 'page-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit, OnDestroy {

  public buckets: Array<Bucket> = [];
  public defaultViewMode: string = 'full';
  public viewModeChoosed: string = '';
  private _subBuckets;
  private _subDragula;
  private _subBucketsPageReload;

  constructor(
    private _router: Router,
    private _bucket: BucketService,
    private _dragula: DragulaService,
    private _toast: ToastService,
    private _shared: SharedService,
    private _auth: AuthService
    ) {
    moment.locale('fr');
    const bagLink: any = this._dragula.find('bag-link');
    if (bagLink !== undefined ) this._dragula.destroy('bag-link');
    this._dragula.setOptions('bag-link', {
      revertOnSpill: true
    });
    
    this._subDragula = this._dragula.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    this._subBucketsPageReload = this._shared.get('BucketsPageShouldBeReloaded').subscribe((state) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this._bucket.setBucketName(null);
    // Subscriber
    this._subBuckets = this._bucket.getBuckets().subscribe((response) => {
      let tmp =  response.data;
      this._shared.setData('selectedBucketColor', BUCKET_COLORS[0].code);
      if (this._auth.isLoggedIn()) this._shared.setData('hasBeenLogged', true);
      this.buckets = [];
      tmp.forEach((bucket) => {
        bucket.createdAt = this.formatDate(bucket.createdAt);
        this.buckets.push(new Bucket(bucket.id, bucket.name, bucket.color, bucket.createdAt, bucket.updatedAt, bucket.Links));
      });
    }, (err) => { console.error('getBuckets', err); });
  }

  ngOnDestroy(): void {
    if (this._subBuckets) this._subBuckets.unsubscribe();
    if (this._subBucketsPageReload) this._subBucketsPageReload.unsubscribe();
    if (this._subDragula) this._subDragula.unsubscribe();
  }

  public handleCreation($event): void {
    this._toast.displaySuccessToast(`bucket ${$event.name} has been added!`);
    this.ngOnInit();
  }

  public handleBucketsViewMode($event: string) {
    this.viewModeChoosed = $event;
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
  
  private onDrop(args) {
    let [e, newBucketId] = args;
    let linkId = +[e.className.replace(/[^\d.]/g,'')];
    newBucketId = +[newBucketId.className.replace("links-container for-bucket-", "")];
    if (isNaN(newBucketId)) { newBucketId = -1; }
    if (parseInt(newBucketId, 10)) {
      console.log('inDrop app -- bucketId', newBucketId, 'linkId', linkId)
      if (newBucketId < 0) {
       this._bucket.deleteLink(linkId).subscribe((resp) => {
          this._shared.setData('BucketsShouldBeReloaded', resp.data.BucketId);
        }, (err) => {console.error('delete link', err)});
      } else {
        this._bucket.patchLink(linkId, { bucketId: newBucketId }).subscribe((resp) => {
          this._shared.setData('BucketsShouldBeReloaded', resp.data.BucketId);
        }, (err) => {console.error('patch link', err)});
      }
    } else if (newBucketId === 0) {
      this._bucket.patchLink(linkId, { bucketId: null }).subscribe((resp) => {
        this._shared.setData('BucketsShouldBeReloaded', null);
      }, (err) => {console.error('patch link', err)})
    }
  }

}




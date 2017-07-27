import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { DragulaService } from 'ng2-dragula';
import * as moment from 'moment';

import { BucketService, SharedService } from '../../core';
import { Bucket, Link } from '../../core/models';
import { lightenColor, hexToRGB } from '../../core/const';

@Component({
  selector: 'page-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit, OnDestroy {

  public _id: number;
  public bucket: Bucket;
  public filteredLinks: Array<Link>;
  public subBucket;
  public filterField: string = '_createdAt';
  public filterFieldDir: number = -1;
  private _subBucketPageReload;

  constructor(
    private route: ActivatedRoute,
    private _bucket: BucketService,
    private _router: Router,
    private _shared: SharedService,
    private _dragula: DragulaService,
  ) {
    moment.locale('fr');
    this._id = +[window.location.pathname.split('/').pop()]; // convert string to number
    this._dragula.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    this._subBucketPageReload = this._shared.get('BucketPageShouldBeReloaded').subscribe((state) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.subBucket = this._bucket.getBucket(this._id).subscribe((resp) => {
      this.bucket = resp.data;
      this._shared.setData('selectedBucketColor', this.bucket.color);
      this._bucket.setBucketName(this.bucket.name);
      this.filteredLinks = this.bucket.Links;
    })
  }

  public search(term: string) {
    if (!term) this.filteredLinks = this.bucket.Links;
    this.filteredLinks = this.bucket.Links.filter(d => d.title.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  }

  public handleCreation(event: any) {
    this.ngOnInit();
  }

  public changeFilterField(filterName: string): void {
    this.filterField = filterName;
    this.reverseFilterDir();
  }

  public reverseFilterDir(): void {
    this.filterFieldDir = this.filterFieldDir === 1 ? -1 : 1;
  }

  public getGradient(color): string {
    if (color) return hexToRGB(lightenColor(color, .5), .3);
  }
  public getBaseColor(color): string {
    if (color) return hexToRGB(color, .1);
  }

  private onDrop(args) {
    let [e, newBucketId, unused, linkDOMItem] = args;
    let linkId = +[e.className.replace(/[^\d.]/g,'')];
    newBucketId = +[newBucketId.className.replace("links-container for-bucket-", "")];
    if (parseInt(newBucketId, 10)) {
      this._bucket.patchLink(linkId, { bucketId: newBucketId }).subscribe((resp) => {
      }, (err) => {console.error('patch link', err)})
    } else if (newBucketId === 0) {
      this._bucket.patchLink(linkId, { bucketId: null }).subscribe((resp) => {
      }, (err) => {console.error('patch link', err)})
    }
  }

  ngOnDestroy() {
    if (this.subBucket) this.subBucket.unsubscribe();
    if (this._subBucketPageReload) this._subBucketPageReload.unsubscribe();
  }



}

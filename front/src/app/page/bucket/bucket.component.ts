import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { BucketService } from '../../core';
import { Bucket, Link } from '../../core/models';

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

  constructor(private route: ActivatedRoute, private _bucket: BucketService) {
    moment.locale('fr');
    this._id = +[window.location.pathname.split('/').pop()]; // convert string to number
  }

  ngOnInit() {
    this.subBucket = this._bucket.getBucket(this._id).subscribe((resp) => {
      this.bucket = resp.data;
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

  ngOnDestroy() {
    if (this.subBucket) this.subBucket.unsubscribe();
  }


  
}
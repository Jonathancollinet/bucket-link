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

  constructor(private route: ActivatedRoute, private _bucket: BucketService) {
    moment.locale('fr');
    this._id = +[window.location.pathname.split('/').pop()]; // convert string to number
  }

  ngOnInit() {
    this.subBucket = this._bucket.getBucket(this._id).subscribe((resp) => {
      this.bucket = resp.data;
      this.filteredLinks = this.bucket.links;
    })
  }

  search(term: string) {
    if (!term) this.filteredLinks = this.bucket.links;
    this.filteredLinks = this.bucket.links.filter(d => d.title.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  }

  handleCreation(event: any) {
    this.ngOnInit();
  }

  ngOnDestroy() {
    if (this.subBucket) this.subBucket.unsubscribe();
  }


  
}
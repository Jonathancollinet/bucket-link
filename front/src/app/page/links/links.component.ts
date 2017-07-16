import { Component, OnInit, NgZone } from '@angular/core';
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
  
  public links: Array<Link> = [];
  public filteredLinks: Array<Link>;
  public filterField: string = '_createdAt';
  public filterFieldDir: number = -1;

  constructor(
    private _router: Router,
    private _zone: NgZone,
    private _bucket: BucketService,
  ) {
     moment.locale('fr');
  }

  ngOnInit() {
    this._bucket.getLinks().subscribe((response) => {
      let tmp =  response.data;
      this.links = [];
      this.filteredLinks = [];
      tmp.forEach((link) => {
        this.links.push(new Link(link.id, link.title, link.description, link.url, link.createdAt, link.updatedAt, link.bucketId));
      });
      this.filteredLinks = this.links;
    }, (err) => {
      console.error('getBuckets', err);
    });
  }

  public changeFilterField(filterName: string): void {
    this.filterField = filterName;
    this.reverseFilterDir();
  }

  public reverseFilterDir(): void {
    this.filterFieldDir = this.filterFieldDir === 1 ? -1 : 1;
  }

  public search(term: string) {
    if (!term) this.filteredLinks = this.links;
    this.filteredLinks = this.links.filter(d => d.title.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  }

  public formatDate(date): string {
    return moment(date).fromNow();
  }
  
}
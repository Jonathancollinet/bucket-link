import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent {

  public buckets: Array<any> = [];

  constructor(private _router: Router) {
    this.buckets = [
      {id: 1, name: 'hey', nb_links: 4, created_at: new Date() },
      {id: 2, name: 'toto', nb_links: 3, created_at: new Date() }
    ];
  }

}
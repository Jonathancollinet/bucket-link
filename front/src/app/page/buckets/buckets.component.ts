import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'page-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent {

  public buckets: Array<any> = [];

  constructor(private _router: Router) {

    moment.locale('fr');
    let moment1: string = moment().subtract(10, 'days').calendar();
    let moment2: string = moment().subtract(6, 'days').calendar();

    this.buckets = [
      {id: 1, name: 'hey', nb_links: 4, created_at: moment1 },
      {id: 2, name: 'toto', nb_links: 3, created_at: moment2 }
    ];
  }

}
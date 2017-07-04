import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'page-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit, OnDestroy {
  
  public bucket: Array<any> = [];
  public _id: number;
  private sub: any;
  

  constructor(private route: ActivatedRoute) {
    moment.locale('fr');
    let moment1: string = moment().subtract(1, 'days').calendar(); 
    let moment2: string = moment().startOf('hour').fromNow(); 

     this.bucket = [
      {id: 1, title: 'Hacker News', url: 'https://news.ycombinator.com', created_at: moment1 },
      {id: 2, title: 'Stack Overflow', url: 'https://stackoverflow.com', created_at: moment2 }
    ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = +params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
}
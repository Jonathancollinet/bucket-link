import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit, OnDestroy {

  public bucket: Array<any> = [];
  private _id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) {
     this.bucket = [
      {id: 1, title: 'Hacker News', url: 'https://news.ycombinator.com', created_at: new Date() },
      {id: 2, title: 'Stack Overflow', url: 'https://stackoverflow.com', created_at: new Date() }
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
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Bucket, Link } from '../../models';

@Component({
  selector: 'core-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent {

  @Input() bucket: Bucket;

  constructor(private _router: Router) {

  }

  goToBucket(id: number) {
    this._router.navigate(["bucket", id]);
  }


}


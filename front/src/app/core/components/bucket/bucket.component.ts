import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BucketService } from '../../services/bucket.service';
import { Bucket, Link } from '../../models';

@Component({
  selector: 'core-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent {

  @Input() bucket: Bucket;

  constructor(private _router: Router, private _bucket: BucketService) {
  }

  goToBucket(id: number) {
    this._bucket.setBucketName(this.bucket.name);
    this._router.navigate(["bucket", id]);
  }


}


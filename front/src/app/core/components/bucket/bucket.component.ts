import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BucketService } from '../../services/bucket.service';
import { Bucket, Link } from '../../models';
import { lightenColor } from '../../const';

@Component({
  selector: 'core-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent {

  @Input() bucket: Bucket;
  @Output() hasBeenDeleted = new EventEmitter();

  private _mode: number = 0;
  private _selected: boolean = false;
  private _color: string;

  constructor(
    private _router: Router,
    private _bucket: BucketService
  ) {
  }

  public goToBucket(id: number) {
    this._bucket.setBucketName(this.bucket.name);
    this._router.navigate(["bucket", id]);
  }

  public toggleMode(): void {
    // VIEW // EDIT
    this._mode = this._mode === 0 ? 1 : 0;
  }

  public changeHoverStyle($event): void {
    this._color = $event.type == 'mouseover' ? lightenColor(this.bucket.color, 0.1) : this.bucket.color;
  }

  public deleteBucket(id: number): void {
    this._bucket.deleteBucket(id).subscribe((resp) => {
      this.hasBeenDeleted.emit(true);
    }, (err) => {
      console.error('delete bucket', err);
    })
  }
}


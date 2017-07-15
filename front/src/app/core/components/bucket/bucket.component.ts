import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  @Output() bucketEvent = new EventEmitter();

  private _mode: number = 0;
  private _selected: boolean = false;
  private _color: string;
  private editBucketForm: any
  private _tmpColor: string;

  constructor(
    private _router: Router,
    private _bucket: BucketService,
    private _fb: FormBuilder
  ) {
  }

  public goToBucket(id: number) {
    this._bucket.setBucketName(this.bucket.name);
    this._router.navigate(["bucket", id]);
  }

  public validateChanges(): void {
    this.toggleMode();
  }

  public toggleMode(): void {
    // VIEW // EDIT
    this._mode = this._mode === 0 ? 1 : 0;
    if (this._mode === 1) {
      this.editBucketForm = this._fb.group({
        'name': [''],
        'color': ['']
      });
    }
  }

  public handleColorChosen(bucket, colorData) {
    bucket.color = colorData.code;
    this._tmpColor = colorData.code;
  }

  public editBucket(formData, valid: boolean): void {
    if (valid) {
      if (formData.name.trim()) {
        let tmp = { name: formData.name, color: this._tmpColor || this.bucket.color };
        console.log('will change');
        this._bucket.patchBucket(this.bucket.id, tmp).subscribe((resp) => {
          this.bucketEvent.emit(true);
          this.editBucketForm.controls.name.updateValueAndValidity(formData.name);
        }, (err) => {
          console.error(err);
        });
      } else {
        this.toggleMode();
      }
    }
  }

  public changeHoverStyle($event): void {
    this._color = $event.type == 'mouseover' ? lightenColor(this.bucket.color, 0.1) : this.bucket.color;
  }

  public deleteBucket(id: number): void {
    this._bucket.deleteBucket(id).subscribe((resp) => {
      this.bucketEvent.emit(true);
    }, (err) => {
      console.error('delete bucket', err);
    })
  }
}


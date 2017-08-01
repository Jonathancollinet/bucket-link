import { Component, Output, ViewChild, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BucketService } from '../../services/bucket.service';
import { ToastService } from '../../services/toast.service';
import { BUCKET_COLORS } from '../../const';

@Component({
  selector: 'core-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss']
})
export class AddBucketComponent {

  @Output() hasBeenCreated = new EventEmitter();
  @ViewChild('addBucket') addBucket;

  createBucket: FormGroup;
  public color: string;
  public bucketColors: Array<any> = BUCKET_COLORS;
  public bucketColorsLength: number = this.bucketColors.length;
  private _open_create: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _bucket: BucketService,
    private _toast: ToastService
  ) {
    // Randomize default bucker color
    this.color = this.bucketColors[Math.floor(Math.random() * (0 + this.bucketColorsLength - 0)) + 0].code;

    this.createBucket = this._fb.group({
      'color': [null],
      'name': [null, Validators.required]
    });
  }

  public handleColorChosen(data: any): void {
    this.color = data.code;
  }

  public submitForm(formData: any, valid: boolean): void {
    if (valid) {
      let tmp = { name: formData.name, color: this.color };

      this._bucket.createBucket(tmp).subscribe(
        (result) => {
          this.hasBeenCreated.emit(tmp);
        },
        (err) => { this._toast.displayErrorToast(err.statusText) }
      ); // end subscribe
      this.createBucket.reset();
      this._open_create = false;
    } // end valid
  }

  public reverseOpenCreate() {
    if (!this._open_create) {
      this.addBucket.nativeElement.focus();
    } else {
      this.addBucket.nativeElement.blur();
    }
    this._open_create = !this._open_create;
  }

}

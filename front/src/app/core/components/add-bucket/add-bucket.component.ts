import { Component, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BucketService } from '../../services/bucket.service';
import { BUCKET_COLORS } from '../../const';

@Component({
  selector: 'core-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss']
})
export class AddBucketComponent {

  @Output() hasBeenCreated = new EventEmitter();

  createBucket: FormGroup;
  public color: string;
  public bucketColors: Array<any> = BUCKET_COLORS;
  public bucketColorsLength: number = this.bucketColors.length;

  constructor(
    private _fb: FormBuilder,
    private _bucket: BucketService
  ) {
    // Randomize default bucker color
    this.color = this.bucketColors[Math.floor(Math.random() * (0 + this.bucketColorsLength - 0)) + 0].code;

    this.createBucket = this._fb.group({
      'color': [null],
      'name': [null, Validators.required]
    });
  }

  handleColorChosen(data: any) {
    this.color = data.code;
  }

  submitForm(formData: any, valid: boolean) {
    if (valid) {
      let tmp = { name: formData.name, color: this.color };

      this._bucket.createBucket(tmp).subscribe(
        (result) => {
          this.hasBeenCreated.emit(tmp);
        },
        (err) => { console.error(err); }
      ); // end subscribe
      this.createBucket.reset();
    } // end valid
  }

}

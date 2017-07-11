import { Component, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BucketService } from '../../services/bucket.service';


@Component({
  selector: 'core-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss']
})
export class AddBucketComponent {

  @Output() hasBeenCreated = new EventEmitter();

  createBucket: FormGroup;
  private _clicked: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _bucket: BucketService
  ) {
    this.createBucket = this._fb.group({
      'color': [null],
      'name': [null, Validators.required]
    });
  }

  submitForm(formData: any, valid: boolean) {
    if (valid) {
      let tmp = { name: formData.name, color: formData.color || '#000' };

      this._bucket.createBucket(tmp).subscribe(
        (result) => { this.hasBeenCreated.emit(true); },
        (err) => { console.error(err); }
      ); // end subscribe
      this.createBucket.reset();
    } // end valid
  }

}

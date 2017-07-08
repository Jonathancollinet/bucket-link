import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BucketService } from '../../services/bucket.service';

@Component({
  selector: 'core-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent {

  @Output() hasBeenCreated = new EventEmitter();

  createLink: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _bucket: BucketService
  ) {
    this.createLink = this._fb.group({
      'url': [null, Validators.required]
    });
  }

  submitForm(formData: any, valid: boolean) {
    if (valid) {
      let tmp = { url: formData.url };

      this._bucket.createLink(tmp).subscribe(
        (result) => { this.hasBeenCreated.emit(true); },
        (err) => { console.error(err); }
      ); // end subscribe
    } // end valid
  }

  public handleCreation() {
    let url = this.createLink.controls.url.value;
    if (url.trim()) {
      this._bucket.createLink({ title: 'A link', url: url }).subscribe((resp) => {
        console.log('resp', resp);
        this.hasBeenCreated.emit(true);
        this.createLink.reset();
      }, (err) => { console.error(err); })
    }
  }

  public keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.handleCreation();
    }
  }
  
}
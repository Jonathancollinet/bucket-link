import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BucketService } from '../../services/bucket.service';

@Component({
  selector: 'core-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent {

  private _focus: boolean = false;

  @Input() public _bucketId: number;
  private _bucketName: string;
  @ViewChild('addLink') addInput;
  @Output() hasBeenCreated = new EventEmitter();

  createLink: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _bucket: BucketService
  ) {
    this.createLink = this._fb.group({
      'url': [null, Validators.required],
      'bucketId': [null, Validators.required]
    });
  }

  submitForm(formData: any, valid: boolean) {
    if (valid) {
      let tmp = {
        url: formData.url,
        bucketId: formData.bucketId
      };

      this._bucket.createLink(tmp).subscribe(
        (result) => { this.hasBeenCreated.emit(true); },
        (err) => { console.error(err); }
      ); // end subscribe
    } // end valid
  }

  public handleCreation() {
    let url: string = this.createLink.controls.url.value;
    if (url && url.trim()) {
      let linkData: any = {
        title: 'A link',
        url: url,
        bucketId: this.determineBucketID()
      };
      this._bucket.createLink(linkData).subscribe((resp) => {
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

  public focusAddLinkInputElement() {
    this.addInput.nativeElement.focus();
    return true;
  }

  public determineBucketID(): number {
    let bucket_id: number = 0;
    if (this._router.url.indexOf('/bucket/') > -1) {
      bucket_id = +[window.location.pathname.split('/').pop()]; // convert string to number
    }
    this._bucketId = bucket_id;
    this.normalizeBucketName();
    return bucket_id;
  }

  public normalizeBucketName(): string {
    if (this._bucketId === 0)  return "UNCATEGORIZED";
    else return this._bucketId.toString();
  }

}

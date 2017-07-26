import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BucketService } from '../../services/bucket.service';
import { SharedService } from '../../services/shared.service';
import { ToastService } from '../../services/toast.service';
import { BUCKET_COLORS } from '../../const';

@Component({
  selector: 'core-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent {

  private _focus: boolean = false;

  @Input() public _bucketId: number;
  public selectedBucketColor: any;
  private _bucketName: string;
  @ViewChild('addLink') addInput;
  @Output() hasBeenCreated = new EventEmitter();

  createLink: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _bucket: BucketService,
    private _shared: SharedService,
    private _toast: ToastService
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
        (err) => { 
          this._toast.displayErrorToast(err.statusText);
          this.createLink.reset();
          this.createLink.controls.bucketId.updateValueAndValidity(this.determineBucketID());
        }
      ); // end subscribe
    } // end valid
  }

  public handleCreation() {
    let url: string = this.createLink.controls.url.value;
    if (url && url.trim()) {
      let bucketID = this.determineBucketID();
      let linkData: any = {
        url: url,
        bucketId: bucketID
      };
      if (bucketID !== null) {
        this._bucket.createLinkInBucket(bucketID, linkData).subscribe((resp) => {
        console.log('resp', resp);
        this.hasBeenCreated.emit(bucketID);
        this.createLink.reset();
        this.createLink.controls.bucketId.updateValueAndValidity(this.determineBucketID());
      }, (err) => {
        this._toast.displayErrorToast(err.statusText);
      })
      } else {
        this._bucket.createLink(linkData).subscribe((resp) => {
        this.hasBeenCreated.emit(null);
        this.createLink.reset();
        this.createLink.controls.bucketId.updateValueAndValidity(this.determineBucketID());
        }, (err) => { this._toast.displayErrorToast(err.statusText); })
      }
      
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

  public getBucketBorderColor() {
    return this._shared.getData('selectedBucketColor');
  }

  public determineBucketID(): any {
    let bucket_id = null;
    if (this._router.url.indexOf('/bucket/') > -1) {
      bucket_id = +[window.location.pathname.split('/').pop()]; // convert string to number
    } else if (this._bucket.getBucketIDForPost() != null) {
      bucket_id = this._bucket.getBucketIDForPost();
    } else {
      bucket_id = null;
    }
    this._bucketId = bucket_id;
    this.normalizeBucketName();
    return bucket_id;
  }

  public normalizeBucketName(): string {
    if (this._bucketId === null || this._bucket.getBucketName() === null)  return "UNCATEGORIZED";
    else return this._bucket.getBucketName();
  }

}

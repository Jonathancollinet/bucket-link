import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Link } from '../../models';
import { BucketService } from '../../services/bucket.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'core-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {

  private _link: Link;
  private _mode: number = 0;
  private editLinkForm: any

  @Input()
  set link(link: Link) {
    if (link) {
      if (!link.dateHasBeenFormated) {
        link = this.formatDate(link);
      }
      this._link = link;
    }
  }

  @Output() linkEvent = new EventEmitter();

  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _bucket: BucketService,
    private _fb: FormBuilder
  ) {}

  public toggleMode(): void {
    // VIEW // EDIT
    this._mode = this._mode === 0 ? 1 : 0;
    if (this._mode === 1) {
      this.editLinkForm = this._fb.group({
        'alt_title': [''],
        'alt_description': ['']
      });
    }
  }

  public formatDate(link: Link): Link {
      if (link.setCreated && link.setUpdated) {
        link.setCreated(link.createdAt);
        link.setUpdated(link.updatedAt);
      }
      link.createdAt = moment(link.createdAt).fromNow();
      link.updatedAt = moment(link.updatedAt).fromNow();
     
      link.dateHasBeenFormated = true;
      return link;
  }

  public editLink(formData, valid: boolean): void {
    if (valid) {
      if (formData.alt_title.trim() || formData.alt_description.trim()) {
        let tmp = {
          alt_title: (formData.alt_title || this._link.title),
          alt_description: (formData.alt_description || this._link.description)
        };
        this._bucket.patchLink(this._link.id, tmp).subscribe((resp) => {
          this.linkEvent.emit(true);
          this.editLinkForm.controls.alt_title.updateValueAndValidity(formData.alt_title);
          this.editLinkForm.controls.alt_description.updateValueAndValidity(formData.alt_description);
        }, (err) => {
          this._toast.displayErrorToast(err.statusText);
        });
      } else {
        this.toggleMode();
      }
    }
  }

   public deleteLink(id: number): void {
    this._bucket.deleteLink(id).subscribe((resp) => {
      this.linkEvent.emit(true);
    }, (err) => {
      this._toast.displayErrorToast(err.statusText);
    })
  }

  public displayConfirmCopy() {
     this._toast.displaySuccessToast('Link is in your clipboard!')
  }
}
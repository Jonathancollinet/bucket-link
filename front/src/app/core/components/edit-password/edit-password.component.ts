import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'core-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent {

  @Output() passwordUpdate = new EventEmitter();

  editPassword: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private auth: AuthService,
    private _toast: ToastService
  ) {
    this.editPassword = this._fb.group({
      'old_password': [null, Validators.required],
      'new_password': [null, Validators.required]
    });
  }

  submitForm(formData: any, valid: boolean) {
    if (valid) {
      let passwords = {
        old_password: formData.old_password,
        new_password: formData.new_password
      };

      this.auth.editPassword(passwords).subscribe(
        (resp) => {
          this.passwordUpdate.emit(resp.data);
        },
        (err) => { this._toast.displayErrorToast(err.statusText); }
      ); // end subscribe
    } // end valid
  }

}
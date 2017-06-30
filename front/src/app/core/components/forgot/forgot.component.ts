import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { emailValidator } from '../../validators/email.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'core-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  @Output() forgotRequested = new EventEmitter();

  public forgotForm: FormGroup;
  public email: AbstractControl;

  constructor(private _fb: FormBuilder, private auth: AuthService) {

    this.forgotForm = this._fb.group({
      email: [null, Validators.compose([
        Validators.required, emailValidator
      ])]
    });

    this.email = this.forgotForm.controls['email'];
  }

  isAuth(): boolean {
    return this.auth.isLoggedIn();
  }

  submitForm(formData): void {
    let user = { email: formData.email };

    this.auth.forgot(user).subscribe(
      (result) => {
        console.info('ForgotSuccessfull', result);
        this.forgotRequested.emit(true);
      },
      (err) => {
        console.error('ForgotError', err);
         this.forgotRequested.emit(false);
      }
    );
  }

}
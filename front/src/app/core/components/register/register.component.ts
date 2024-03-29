import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { emailValidator } from '../../validators/email.validator';
import { samePasswordValidator } from '../../validators/samepassword.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'core-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() isRegistred = new EventEmitter();

  public registerForm: any;
  public firstname: any;
  public email: any;
  public password: any;
  public confirmPassword: any;

  constructor(private _fb: FormBuilder, private auth: AuthService) {

    const NAME_LENGTH_MIN = 4;
    const NAME_LENGTH_MAX = 16;
    const PASS_LENGTH_MIN = 6;
    const PASS_LENGTH_MAX = 32;

    this.registerForm = this._fb.group({
      firstname: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required, emailValidator
      ])],
      password: this._fb.group({
        pass: [null, Validators.compose([
          Validators.required,
          Validators.minLength(PASS_LENGTH_MIN),
          Validators.maxLength(PASS_LENGTH_MAX)])],
        confirmPass: [null, Validators.compose([
          Validators.required,
          Validators.minLength(PASS_LENGTH_MIN),
          Validators.maxLength(PASS_LENGTH_MAX)])]
      }, { validator: samePasswordValidator })
    });

    this.firstname = this.registerForm.controls['firstname'];
    this.email = this.registerForm.controls['email'];
    this.password = this.registerForm.controls.password.controls['pass']
    this.confirmPassword = this.registerForm.controls.password.controls['confirmPass'];
  }

  submitForm(formData) {
    this.isRegistred.emit({p: true, r: false});
    let user = {
      firstname: formData.firstname,
      email: formData.email,
      password: formData.password.pass,
      confirmPassword: formData.password.confirmPass
    };

    this.auth.register(user).subscribe(
      (result) => {
        console.info('RegisterSuccessfull', result);
        let user = {
          email: formData.email,
          password: formData.password.pass
        }
        this.auth.login(user).subscribe(
          (result) => {
            this.isRegistred.emit({p: false, r: true});
            console.info('LoginSuccessfull', result);
          },
          (err) => {
            this.isRegistred.emit({p: false, r: true});
            console.error('LoginError', err);
          }
        );
      },
      (err) => {
        this.isRegistred.emit({p: false, r: false});
        console.error('RegisterError', err);
      }
    );
  }

}
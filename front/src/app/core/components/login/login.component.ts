import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'core-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() hasBeenLogged = new EventEmitter();

  loginForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private auth: AuthService) {
    this.loginForm = this._fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }


  isAuth(): boolean {
    return this.auth.isLoggedIn();
  }

  submitForm(formData: any, valid: boolean) {
    if (valid) {
      let user = {
        email: formData.email,
        password: formData.password
      };

      this.auth.login(user).subscribe(
        (result) => { this.hasBeenLogged.emit(true); },
        (err) => { console.error(err); }
      ); // end subscribe
    } // end valid
  }

}
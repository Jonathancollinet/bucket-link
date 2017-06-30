import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
    TopBarComponent, SpinnerComponent,
    LoginComponent, RegisterComponent,
    ForgotComponent, ResetComponent,
    emailValidator, samePasswordValidator,
    HttpService, SharedService,
    SocketService, AuthService
} from  './index';

@NgModule({
  declarations: [
    TopBarComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent
  ],
  exports: [
    TopBarComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    HttpService,
    SharedService,
    SocketService,
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }

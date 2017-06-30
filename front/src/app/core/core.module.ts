import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SidebarModule } from 'ng-sidebar';

import {
    TopBarComponent, SpinnerComponent,
    LoginComponent, RegisterComponent,
    ForgotComponent, ResetComponent,
    emailValidator, samePasswordValidator,
    HttpService, SharedService,
    SocketService, AuthService,
    BucketService
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
    HttpModule,
    SidebarModule.forRoot(),
  ],
  providers: [
    HttpService,
    SharedService,
    SocketService,
    AuthService,
    BucketService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }

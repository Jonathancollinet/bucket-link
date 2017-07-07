import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DragulaModule } from 'ng2-dragula';
import { SidebarModule } from 'ng-sidebar';

import {
    TopBarComponent, SpinnerComponent,
    LoginComponent, RegisterComponent,
    ForgotComponent, ResetComponent,
    AddLinkComponent, AddBucketComponent,
    BucketComponent, LinkComponent,
    emailValidator, samePasswordValidator,
    ReversePipe,TruncatePipe,
    HttpService, SharedService,
    SocketService, AuthService,
    BucketService, AuthGuard
} from  './index';

@NgModule({
  declarations: [
    TopBarComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    AddLinkComponent,
    AddBucketComponent,
    BucketComponent,
    LinkComponent,
    ReversePipe,
    TruncatePipe
  ],
  exports: [
    TopBarComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    AddLinkComponent,
    AddBucketComponent,
    BucketComponent,
    LinkComponent,
    ReversePipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SidebarModule.forRoot(),
    DragulaModule
  ],
  providers: [
    HttpService,
    SharedService,
    SocketService,
    AuthService,
    AuthGuard,
    BucketService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }

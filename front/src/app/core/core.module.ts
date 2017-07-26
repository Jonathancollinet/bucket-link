import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DragulaModule } from 'ng2-dragula';
import { SidebarModule } from 'ng-sidebar';
import { ClipboardModule } from 'ngx-clipboard';
import {ToastyModule} from 'ng2-toasty';

import {
    TopBarComponent, SpinnerComponent,
    LoginComponent, RegisterComponent,
    ForgotComponent, ResetComponent,
    AddLinkComponent, AddBucketComponent,
    BucketComponent, LinkComponent,
    ColorBoxComponent, ViewModeSelectorComponent,
    emailValidator, samePasswordValidator,
    ReversePipe,TruncatePipe, SortPipe,
    OrderByPipe,
    HttpService, SharedService,
    SocketService, AuthService,
    BucketService, ToastService,
    AuthGuard
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
    ColorBoxComponent,
    ViewModeSelectorComponent,
    ReversePipe,
    TruncatePipe,
    SortPipe,
    OrderByPipe
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
    ColorBoxComponent,
    ViewModeSelectorComponent,
    ReversePipe,
    TruncatePipe,
    SortPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ClipboardModule,
    SidebarModule.forRoot(),
    DragulaModule,
    ToastyModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpService,
    SharedService,
    SocketService,
    AuthService,
    AuthGuard,
    BucketService,
    ToastService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }

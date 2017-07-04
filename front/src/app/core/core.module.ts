import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {DndModule} from 'ng2-dnd';
import { SidebarModule } from 'ng-sidebar';

import {
    TopBarComponent, SpinnerComponent,
    LoginComponent, RegisterComponent,
    ForgotComponent, ResetComponent,
    AddLinkComponent, AddBucketComponent,
    emailValidator, samePasswordValidator,
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
    AddBucketComponent
  ],
  exports: [
    TopBarComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    AddLinkComponent,
    AddBucketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SidebarModule.forRoot(),
    DndModule
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

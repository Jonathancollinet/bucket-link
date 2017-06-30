import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';

import { CoreModule } from '../core/core.module';
import { RoutingModule } from '../app.routing';

import {
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent
} from  './index';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent
  ],
  imports: [
    BrowserModule,

    CoreModule,
    RoutingModule
  ],
  providers: []
})
export class PageModule { }

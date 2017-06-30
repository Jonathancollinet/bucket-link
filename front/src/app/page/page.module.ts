import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';

import { SidebarModule } from 'ng-sidebar';

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

    SidebarModule.forRoot(),

    CoreModule,
    RoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }

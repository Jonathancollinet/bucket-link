import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';

import { DragulaModule } from 'ng2-dragula'; // Drag-n-Drop
import { SidebarModule } from 'ng-sidebar';
import { ToastyModule } from 'ng2-toasty';

import { CoreModule } from '../core/core.module';
import { RoutingModule } from '../app.routing';

import {
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent,
    LinksComponent,
    ProfileComponent
} from  './index';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent,
    LinksComponent,
    ProfileComponent
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent,
    LinksComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,

    DragulaModule,
    SidebarModule.forRoot(),
    ToastyModule,

    CoreModule,
    RoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }

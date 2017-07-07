import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';

import { DragulaModule } from 'ng2-dragula'; // Drag-n-Drop
import { SidebarModule } from 'ng-sidebar';

import { CoreModule } from '../core/core.module';
import { RoutingModule } from '../app.routing';

import {
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent,
    LinksComponent
} from  './index';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent,
    LinksComponent
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
    ForgotComponent,
    BucketsComponent,
    BucketComponent,
    LinksComponent
  ],
  imports: [
    BrowserModule,

    DragulaModule,
    SidebarModule.forRoot(),

    CoreModule,
    RoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }

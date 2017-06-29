import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpModule } from '@angular/http';

import { CoreModule } from '../core/core.module';

import {
    HomeComponent,
    ListComponent,
    RegisterComponent
} from  './index';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    RegisterComponent
  ],
  exports: [
    HomeComponent,
    ListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,

    CoreModule
  ],
  providers: []
})
export class PageModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

/* DEP */
import { DragulaModule } from 'ng2-dragula'; // Drag-n-Drop
import { SidebarModule } from 'ng-sidebar'; // Sidebar
import { ClipboardModule } from 'ngx-clipboard';
import {ToastyModule} from 'ng2-toasty';


/* HOMEMADE */
import { CoreModule } from './core/core.module';
import { PageModule } from './page/page.module'; 


import { AppComponent } from './__app/app.component';

// Local router
import { RoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    DragulaModule,
    SidebarModule.forRoot(),
    ClipboardModule,
    ToastyModule,

    /* HOMEMADE */
    CoreModule,
    PageModule,

    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(router: Router) {
  }
}

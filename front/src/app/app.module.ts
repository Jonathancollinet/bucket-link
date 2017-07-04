import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

/* DEP */
import { DragulaModule } from 'ng2-dragula'; // Drag-n-Drop
import { SidebarModule } from 'ng-sidebar'; // Sidebar

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

    /* HOMEMADE */
    CoreModule,
    PageModule,

    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

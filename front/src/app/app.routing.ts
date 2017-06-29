import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeComponent as HomePage,
  RegisterComponent as RegisterPage
} from './page';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'register', component: RegisterPage }
  // TODO move in lazy module
  //{ path: 'profile', component: AccountPage, canActivate: [ AuthGuard ] },
  //{ path: 'settings', component: SettingsPage, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
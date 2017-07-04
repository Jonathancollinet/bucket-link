import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeComponent as HomePage,
  RegisterComponent as RegisterPage,
  ForgotComponent as ForgotPage,
  BucketsComponent as BucketsPage,
  BucketComponent as BucketPage
} from './page';
import { AuthGuard } from './core';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot', component: ForgotPage },
  { path: 'buckets', component: BucketsPage, canActivate: [AuthGuard] },
  { path: 'bucket/:id', component: BucketPage, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }

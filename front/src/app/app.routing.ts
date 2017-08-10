import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeComponent as HomePage,
  LoginComponent as LoginPage,
  RegisterComponent as RegisterPage,
  ForgotComponent as ForgotPage,
  BoardsComponent as BoardsPage,
  BucketsComponent as BucketsPage,
  BucketComponent as BucketPage,
  LinksComponent as LinksPage,
  ProfileComponent as ProfilePage,
  DesignComponent as DesignPage
} from './page';
import { AuthGuard } from './core';

const routes: Routes = [
  // Default
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot', component: ForgotPage },
  { path: 'design', component: DesignPage },
  { path: 'boards', component: BoardsPage, canActivate: [AuthGuard] },
  { path: 'buckets', component: BucketsPage, canActivate: [AuthGuard] },
  { path: 'bucket/:id', component: BucketPage, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'links', component: LinksPage, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }

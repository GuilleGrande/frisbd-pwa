import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/welcome-card/login/login.component';
import { RegisterComponent } from './components/welcome-card/register/register.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeCardComponent}, 
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  //{ path: 'admin/dashboard',component: DashboardComponent,canActivate: [ AuthGuard ] },
  { path: '**',pathMatch: 'full',redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

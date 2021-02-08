import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './personal/details/details.component';
import { PersonalComponent } from './personal/personal.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'registration', component: RegistrationComponent},
  {path:'login', component: LoginComponent},
  {path:'personal', component: PersonalComponent},
  {path: 'details/:id',component: DetailsComponent},
  {path: 'about',component: AboutComponent},
  {path: '', redirectTo: 'login',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'Home',component:HomepageComponent ,canActivate: [AuthguardService]},
  {path:'**',redirectTo:'login', pathMatch:'full'},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

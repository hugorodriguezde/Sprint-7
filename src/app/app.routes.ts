import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipInfoComponent } from './components/starship-info/starship-info.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'starships', component: StarshipsComponent, canActivate: [AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'info/:id', component: StarshipInfoComponent},


   {path:'**', redirectTo: 'home'},
];


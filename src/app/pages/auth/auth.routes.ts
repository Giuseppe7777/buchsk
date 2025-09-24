import { Routes } from '@angular/router';
import { Register } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: LoginComponent }
];
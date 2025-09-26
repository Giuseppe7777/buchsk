import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: ':lang',
    children: [
      { path: '', component: LandingPage },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES)
      },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
    ]
  }
];

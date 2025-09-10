import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';

export const routes: Routes = [
  {
    path: ':lang',
    children: [
      { path: '', component: LandingPage }
      // якщо будуть інші сторінки — додаємо їх тут
    ]
  }
];

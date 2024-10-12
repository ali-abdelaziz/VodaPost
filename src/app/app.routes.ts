import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('../app/components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    title: 'Sign up',
    loadComponent: () =>
      import('../app/components/signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'home',
    title: 'Social Scope',
    loadComponent: () =>
      import('../app/components/landing/landing.component').then((c) => c.LandingComponent),
  },
  {
    path: 'features',
    title: 'Features',
    loadComponent: () =>
      import('../app/components/features/features.component').then((c) => c.FeaturesComponent),
  },
  {
    path: 'instagram-analysis',
    title: 'Instagram Analysis',
    loadComponent: () =>
      import('../app/components/instagram-analysis/instagram-analysis.component').then((c) => c.InstagramAnalysisComponent),
  },
  { path: '**', redirectTo: '/home' }
];

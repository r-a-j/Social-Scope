import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    data: { breadcrumb: 'Home' },
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    data: { breadcrumb: 'Login' },
    loadComponent: () =>
      import('../app/components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    title: 'Sign up',
    data: { breadcrumb: 'Sign Up' },
    loadComponent: () =>
      import('../app/components/signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: 'home',
    title: 'Social Scope',
    data: { breadcrumb: 'Home' },
    loadComponent: () =>
      import('../app/components/landing/landing.component').then((c) => c.LandingComponent),
  },
  {
    path: 'features',
    title: 'Features',
    data: { breadcrumb: 'Features' },
    loadComponent: () =>
      import('../app/components/features/features.component').then((c) => c.FeaturesComponent),
  },
  {
    path: 'instagram-analysis',
    title: 'Instagram Analysis',
    data: { breadcrumb: 'Instagram Analysis' },
    loadComponent: () =>
      import('../app/components/instagram-analysis/instagram-analysis.component').then((c) => c.InstagramAnalysisComponent),
  },
  {
    path: 'public-reaction',
    title: 'Public Reaction',
    data: { breadcrumb: 'Public Reaction' },
    loadComponent: () =>
      import('../app/components/public-reaction/public-reaction.component').then((c) => c.PublicReactionComponent),
  },
  {
    path: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    data: { breadcrumb: 'Sentiment Analysis' },
    loadComponent: () =>
      import('../app/components/sentiment-analysis/sentiment-analysis.component').then((c) => c.SentimentAnalysisComponent),
  },
  {
    path: 'reel-analysis-dashboard',
    title: 'Reel Analysis Dashboard',
    data: { breadcrumb: 'Reel Analysis Dashboard' },
    loadComponent: () =>
      import('../app/components/reel-analysis-dashboard/reel-analysis-dashboard.component').then((c) => c.ReelAnalysisDashboardComponent),
  },
  {
    path: 'about',
    title: 'About',
    data: { breadcrumb: 'About' },
    loadComponent: () =>
      import('../app/components/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    data: { breadcrumb: 'Dashboard' },
    loadComponent: () =>
      import('../app/components/dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

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
  {
    path: 'public-reaction',
    title: 'Public Reaction',
    loadComponent: () =>
      import('../app/components/public-reaction/public-reaction.component').then((c) => c.PublicReactionComponent),
  },
  {
    path: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    loadComponent: () =>
      import('../app/components/sentiment-analysis/sentiment-analysis.component').then((c) => c.SentimentAnalysisComponent),
  },
  {
    path: 'reel-analysis-dashboard',
    title: 'Reel Analysis Dashboard',
    loadComponent: () =>
      import('../app/components/reel-analysis-dashboard/reel-analysis-dashboard.component').then((c) => c.ReelAnalysisDashboardComponent),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () =>
      import('../app/components/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

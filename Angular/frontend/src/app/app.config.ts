import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './interceptors/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { NotificationService } from './services/notification.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    importProvidersFrom([BrowserAnimationsModule]),
    ScrollToTopComponent,
    NotificationService,
    ErrorInterceptor
  ]
};

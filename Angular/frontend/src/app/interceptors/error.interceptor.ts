import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (!navigator.onLine) {
                    // Handle offline error
                    this.notificationService.error('Network Error - No Internet Connection');
                } else if (error.status === 0) {
                    // Handle API down error
                    this.notificationService.error('Server Error - API is down');
                } else {
                    // Handle other errors
                    this.notificationService.error('Unexpected error occurred');
                }
                
                return throwError(() => error);
            })
        );
    }
}
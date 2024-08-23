import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Notyf } from 'notyf';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notyf!: Notyf;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        if (isPlatformBrowser(this.platformId)) {
            this.notyf = new Notyf({
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top'
                },
                types: [
                    {
                        type: 'info',
                        duration: 8000,
                        dismissible: true,
                        className: 'notification-info',
                    },
                    {
                        type: 'warning',
                        duration: 5000,
                        dismissible: true,
                        className: 'notification-warning',
                    },
                    {
                        type: 'error',
                        duration: 5000,
                        dismissible: true,
                        className: 'notification-error',
                    },
                    {
                        type: 'success',
                        duration: 5000,
                        dismissible: true,
                        className: 'notification-success',
                    }
                ],
            });
        }
    }

    public error(message: string): void {
        if (this.notyf) {
            this.notyf.open({
                type: 'error',
                message: message
            });
        }
    }

    public success(message: string): void {
        if (this.notyf) {
            this.notyf.open({
                type: 'success',
                message: message
            });
        }
    }

    public warning(message: string): void {
        if (this.notyf) {
            this.notyf.open({
                type: 'warning',
                message: message
            });
        }
    }
    
    public information(message: string): void {
        if (this.notyf) {
            this.notyf.open({
                type: 'info',
                message: message
            });
        }
    }
}

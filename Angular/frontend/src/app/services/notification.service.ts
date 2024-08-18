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
                        background: '#5E00FF',
                        duration: 5000,
                        dismissible: true
                    },
                    {
                        type: 'warning',
                        background: '#AE8F13',
                        duration: 5000,
                        dismissible: true
                    },
                    {
                        type: 'error',
                        background: '#C6394A',
                        duration: 5000,
                        dismissible: true
                    },
                    {
                        type: 'success',
                        background: '#1EA966',
                        duration: 5000,
                        dismissible: true
                    }
                ]
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

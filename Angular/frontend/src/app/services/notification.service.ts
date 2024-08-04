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
                        type: 'warning',
                        background: 'orange',
                        duration: 5000,
                        icon: {
                            className: 'material-icons',
                            tagName: 'i',
                            text: 'warning'
                        }
                    },
                    {
                        type: 'error',
                        background: 'indianred',
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
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {

    public isValidInstagramUrl(url: string): boolean {
        const instagramUrlPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
        return instagramUrlPattern.test(url);
    }
}
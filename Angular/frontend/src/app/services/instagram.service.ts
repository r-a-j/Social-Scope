// instagram.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { InstagramMedia } from '../models/instagram.media.model';

@Injectable({
    providedIn: 'root'
})
export class InstagramService {
    private apiUrl = environment.apiUrl + '/extract-media';

    constructor(private http: HttpClient) { }

    public extractMedia(url: string): Observable<{ images: InstagramMedia[], videos: InstagramMedia[] }> {
        return this.http.post<{ images: InstagramMedia[], videos: InstagramMedia[] }>(this.apiUrl, { url });
    }
}

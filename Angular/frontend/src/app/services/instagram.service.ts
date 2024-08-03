// instagram.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { InstagramMediaWithType } from '../models/instagram.media.model';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private apiUrl = environment.apiUrl + '/extract-media';

  constructor(private http: HttpClient) { }

  public extractMedia(url: string): Observable<{ images: InstagramMediaWithType[], videos: InstagramMediaWithType[] }> {
    return this.http.post<{ images: InstagramMediaWithType[], videos: InstagramMediaWithType[] }>(this.apiUrl, { url });
  }
}

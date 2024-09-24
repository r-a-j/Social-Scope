import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { InstagramMediaWithType } from '../models/instagram.media.model';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private apiUrlExtractMedia = environment.apiUrl + '/extract-media';
  private apiUrlProcessImage = environment.apiUrl + '/process-image';

  constructor(private http: HttpClient) { }

  public extractMedia(url: string): Observable<{ images: InstagramMediaWithType[], videos: InstagramMediaWithType[] }> {
    return this.http.post<{ images: InstagramMediaWithType[], videos: InstagramMediaWithType[] }>(this.apiUrlExtractMedia, { url }).pipe(
      map(response => {
        // Adjust image URLs
        response.images = response.images.map(image => ({
          ...image,
          src: image.src.replace(/\\/g, '/'),
          thumb: image.thumb.replace(/\\/g, '/'),
        }));

        // Adjust video URLs
        response.videos = response.videos.map(video => ({
          ...video,
          src: video.src.replace(/\\/g, '/'),
          thumb: video.thumb.replace(/\\/g, '/'),
        }));

        return response;
      })
    );
  }

  public processImage(imageUrl: string): Observable<{ processed_images: { src: string, thumb: string }[] }> {
    return this.http.post<{
      processed_images: { src: string, thumb: string }[]
    }>(this.apiUrlProcessImage, {
      image_url: imageUrl
    });
  }
}

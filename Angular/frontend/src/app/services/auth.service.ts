import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  public signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }
}

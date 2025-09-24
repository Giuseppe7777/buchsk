import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  private url(path: string) {
    return `${this.config.apiUrl}${path}`;
  }

  // GET
  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.url(path));
  }

  // POST
  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.url(path), body);
  }

  // PUT
  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(this.url(path), body);
  }

  // DELETE
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.url(path));
  }
}

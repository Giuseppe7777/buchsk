import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = '/auth';
  private storageKey = 'jwt';

  constructor(private api: ApiService) {}

  // Register
  register(user: { phone: string; password: string; firstName: string; lastName: string }): Observable<any> {
    return this.api.post(`${this.base}/register`, user);
  }

  // Send OTP
  sendOtp(phone: string): Observable<any> {
    return this.api.post(`${this.base}/send-otp`, { phone });
  }

  // Verify OTP
  verifyOtp(data: { phone: string; code: string }): Observable<any> {
    return this.api.post(`${this.base}/verify-otp`, data);
  }

  // Login
  login(data: { phone: string; password: string }): Observable<{ token: string }> {
    return this.api.post<{ token: string }>('/auth/login', data).pipe(
      tap(res => {
        if (res?.token) {
          localStorage.setItem(this.storageKey, res.token);
          console.log('JWT token:', res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

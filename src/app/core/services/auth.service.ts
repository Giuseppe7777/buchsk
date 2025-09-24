import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = '/auth';

  constructor(private api: ApiService) {}

  // Реєстрація
  register(user: { phone: string; password: string; firstName: string; lastName: string }): Observable<any> {
    return this.api.post(`${this.base}/register`, user);
  }

  // Відправка OTP
  sendOtp(phone: string): Observable<any> {
    return this.api.post(`${this.base}/send-otp`, { phone });
  }

  // Перевірка OTP
  verifyOtp(data: { phone: string; code: string }): Observable<any> {
    return this.api.post(`${this.base}/verify-otp`, data);
  }

  // Логін
  login(data: { phone: string; password: string }): Observable<any> {
    return this.api.post(`${this.base}/login`, data);
  }
}

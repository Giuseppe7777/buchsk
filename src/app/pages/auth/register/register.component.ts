import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service'

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class Register {
  private i18n = inject(TranslationService);

  step: 'form' | 'otp' = 'form';

  user = {
    firstName: '',
    lastName: '',
    phone: '',
    password: ''
  };

  enteredCode: string = '';

  toastMessage: string | null = null;   // повідомлення для тосту
  showToast = false;                    // прапорець показати/сховати

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.user).subscribe({
      next: () => {
        this.step = 'otp';
      },
      error: (err) => {
        console.error(err);
        this.showToastMessage('Помилка реєстрації: ' + err.message);
      }
    });
  }

  onVerifyOtp() {
    this.auth.verifyOtp({ phone: this.user.phone, code: this.enteredCode }).subscribe({
      next: () => {
        this.showToastMessage('Ваш номер підтверджено! Ваш акаунт створено.');
        setTimeout(() => this.router.navigate([`${this.i18n.currentLanguage}/auth/login`]), 1500);
      },
      error: (err) => {
        console.error(err);
        this.showToastMessage('Невірний код підтвердження!');
      }
    });
  }

  onCancelOtp() {
    this.step = 'form';
    this.enteredCode = '';
  }

  // 👇 функція для показу Bootstrap-toast
  private showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMessage = null;
    }, 5000); // автоматично зникає через 5 сек
  }
}

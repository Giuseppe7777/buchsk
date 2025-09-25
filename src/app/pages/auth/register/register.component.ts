import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class Register {
  private i18n = inject(TranslationService);
  private translate = inject(TranslateService);

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
        this.showToastMessage(this.translate.instant('register.error'));
      }
    });
  }

  onVerifyOtp() {
    this.auth.verifyOtp({ phone: this.user.phone, code: this.enteredCode }).subscribe({
      next: () => {
        this.showToastMessage(this.translate.instant('register.success'));
        setTimeout(() => this.router.navigate([`${this.i18n.currentLanguage}/auth/login`]), 1500);
      },
      error: (err) => {
        console.error(err);
        this.showToastMessage(this.translate.instant('register.invalidCode'));
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

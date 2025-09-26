import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private i18n = inject(TranslationService);
  private translate = inject(TranslateService);

  user = {
    phone: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate([`/${this.i18n.currentLanguage}/dashboard`]);
    }
  }

  onSubmit() {
    this.auth.login(this.user).subscribe({
      next: () => {
        this.router.navigate([`${this.i18n.currentLanguage}/dashboard`]);
      },
      error: () => {
        alert(this.translate.instant('login.error'));
      }
    });
  }
}

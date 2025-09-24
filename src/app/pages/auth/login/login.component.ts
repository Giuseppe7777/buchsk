import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    phone: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.user).subscribe({
      next: (res) => {
        console.log('JWT токен:', res.token);
        // TODO: зберегти токен у localStorage або service
        this.router.navigate(['uk/dashboard']); // 👈 після логіну в кабінет
      },
      error: (err) => {
        console.error('Помилка логіну', err);
        alert('Невірний телефон або пароль!');
      }
    });
  }
}

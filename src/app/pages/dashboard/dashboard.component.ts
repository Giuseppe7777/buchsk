import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  firstName = '';
  lastName = '';
  phone = '';
  status = '';
  isVerified = false;
  roles: string[] = [];

  ngOnInit(): void {
    this.api.get<{ data: { firstName: string; lastName: string; phone: string; status: string; isVerified: boolean; roles: string[] } }>('/profile/me')
      .subscribe({
        next: res => {
          this.firstName = res.data.firstName;
          this.lastName = res.data.lastName;
          this.phone = res.data.phone;
          this.status = res.data.status;
          this.isVerified = res.data.isVerified;
          this.roles = res.data.roles;
        },
        error: err => {
          console.error('Помилка при отриманні профілю', err);
        }
      });
  }
}

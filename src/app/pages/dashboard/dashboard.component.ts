import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  firstName = 'Yosyp';   // TODO: пізніше підтягнемо з бекенду
  lastName = 'Malanka';
}

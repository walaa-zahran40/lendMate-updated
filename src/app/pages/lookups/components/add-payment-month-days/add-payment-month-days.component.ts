import { Component } from '@angular/core';

@Component({
  selector: 'app-add-payment-month-days',
  standalone: false,
  templateUrl: './add-payment-month-days.component.html',
  styleUrl: './add-payment-month-days.component.scss',
})
export class AddPaymentMonthDaysComponent {
  addPaymentMonthDays() {
    console.log('added');
  }
}

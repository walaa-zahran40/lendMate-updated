import { Component } from '@angular/core';

@Component({
  selector: 'app-add-payment-methods',
  standalone: false,
  templateUrl: './add-payment-methods.component.html',
  styleUrl: './add-payment-methods.component.scss',
})
export class AddPaymentMethodsComponent {
  addPaymentMethods() {
    console.log('added');
  }
}

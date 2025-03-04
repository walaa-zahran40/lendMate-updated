import { Component } from '@angular/core';

@Component({
  selector: 'app-add-payment-types',
  standalone: false,
  templateUrl: './add-payment-types.component.html',
  styleUrl: './add-payment-types.component.scss',
})
export class AddPaymentTypesComponent {
  addPaymentTypes() {
    console.log('added');
  }
}

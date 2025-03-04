import { Component } from '@angular/core';

@Component({
  selector: 'app-add-currencies-exchange',
  standalone: false,
  templateUrl: './add-currencies-exchange.component.html',
  styleUrl: './add-currencies-exchange.component.scss',
})
export class AddCurrenciesExchangeComponent {
  addCurrenciesExchange() {
    console.log('added');
  }
}

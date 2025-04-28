import { Component } from '@angular/core';

@Component({
  selector: 'app-add-currencies',
  standalone: false,
  templateUrl: './add-currencies.component.html',
  styleUrl: './add-currencies.component.scss',
})
export class AddCurrenciesComponent {
  addCurrencies() {
    console.log('added');
  }
}

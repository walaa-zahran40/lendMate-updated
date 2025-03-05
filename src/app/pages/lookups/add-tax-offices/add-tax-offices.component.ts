import { Component } from '@angular/core';

@Component({
  selector: 'app-add-tax-offices',
  standalone: false,
  templateUrl: './add-tax-offices.component.html',
  styleUrl: './add-tax-offices.component.scss',
})
export class AddTaxOfficesComponent {
  addTaxOffices() {
    console.log('added');
  }
}

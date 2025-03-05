import { Component } from '@angular/core';

@Component({
  selector: 'app-add-countries',
  standalone: false,
  templateUrl: './add-countries.component.html',
  styleUrl: './add-countries.component.scss',
})
export class AddCountriesComponent {
  addCountries() {
    console.log('added');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-address-types',
  standalone: false,
  templateUrl: './add-address-types.component.html',
  styleUrl: './add-address-types.component.scss',
})
export class AddAddressTypesComponent {
  addAddressTypes() {
    console.log('added');
  }
}

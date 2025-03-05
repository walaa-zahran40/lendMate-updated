import { Component } from '@angular/core';

@Component({
  selector: 'app-add-tml-officer-types',
  standalone: false,
  templateUrl: './add-tml-officer-types.component.html',
  styleUrl: './add-tml-officer-types.component.scss',
})
export class AddTmlOfficerTypesComponent {
  addTmlOfficerTypes() {
    console.log('added');
  }
}

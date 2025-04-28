import { Component } from '@angular/core';

@Component({
  selector: 'app-add-rent-structure-types',
  standalone: false,
  templateUrl: './add-rent-structure-types.component.html',
  styleUrl: './add-rent-structure-types.component.scss',
})
export class AddRentStructureTypesComponent {
  addRentType() {
    console.log('added');
  }
}

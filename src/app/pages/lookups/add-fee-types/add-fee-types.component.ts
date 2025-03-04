import { Component } from '@angular/core';

@Component({
  selector: 'app-add-fee-types',
  standalone: false,
  templateUrl: './add-fee-types.component.html',
  styleUrl: './add-fee-types.component.scss',
})
export class AddFeeTypesComponent {
  addFeeTypes() {
    console.log('added');
  }
}

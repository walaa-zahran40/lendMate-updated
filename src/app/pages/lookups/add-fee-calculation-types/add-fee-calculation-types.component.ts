import { Component } from '@angular/core';

@Component({
  selector: 'app-add-fee-calculation-types',
  standalone: false,
  templateUrl: './add-fee-calculation-types.component.html',
  styleUrl: './add-fee-calculation-types.component.scss',
})
export class AddFeeCalculationTypesComponent {
  addFeesCalculation() {
    console.log('added');
  }
}

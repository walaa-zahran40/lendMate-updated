import { Component } from '@angular/core';

@Component({
  selector: 'app-add-fees-range',
  standalone: false,
  templateUrl: './add-fees-range.component.html',
  styleUrl: './add-fees-range.component.scss',
})
export class AddFeesRangeComponent {
  addFeeRanges() {
    console.log('added');
  }
}

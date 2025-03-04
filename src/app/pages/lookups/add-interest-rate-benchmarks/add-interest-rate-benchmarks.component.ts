import { Component } from '@angular/core';

@Component({
  selector: 'app-add-interest-rate-benchmarks',
  standalone: false,
  templateUrl: './add-interest-rate-benchmarks.component.html',
  styleUrl: './add-interest-rate-benchmarks.component.scss',
})
export class AddInterestRateBenchmarksComponent {
  addInterestRate() {
    console.log('added');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-insured-by',
  standalone: false,
  templateUrl: './add-insured-by.component.html',
  styleUrl: './add-insured-by.component.scss',
})
export class AddInsuredByComponent {
  addInsuredBy() {
    console.log('added');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-leasing-type',
  standalone: false,
  templateUrl: './add-leasing-type.component.html',
  styleUrl: './add-leasing-type.component.scss',
})
export class AddLeasingTypeComponent {
  addLeasingType() {
    console.log('added');
  }
}

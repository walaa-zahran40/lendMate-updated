import { Component } from '@angular/core';

@Component({
  selector: 'app-add-phone-types',
  standalone: false,
  templateUrl: './add-phone-types.component.html',
  styleUrl: './add-phone-types.component.scss',
})
export class AddPhoneTypesComponent {
  addPhoneTypes() {
    console.log('added');
  }
}

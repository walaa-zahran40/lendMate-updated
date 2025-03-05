import { Component } from '@angular/core';

@Component({
  selector: 'app-add-identification-types',
  standalone: false,
  templateUrl: './add-identification-types.component.html',
  styleUrl: './add-identification-types.component.scss',
})
export class AddIdentificationTypesComponent {
  addIdentificationTypes() {
    console.log('added');
  }
}

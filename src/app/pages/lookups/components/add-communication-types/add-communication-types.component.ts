import { Component } from '@angular/core';

@Component({
  selector: 'app-add-communication-types',
  standalone: false,
  templateUrl: './add-communication-types.component.html',
  styleUrl: './add-communication-types.component.scss',
})
export class AddCommunicationTypesComponent {
  addCommunicationTypes() {
    console.log('added');
  }
}

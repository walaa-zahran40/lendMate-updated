import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client-types',
  standalone: false,
  templateUrl: './add-client-types.component.html',
  styleUrl: './add-client-types.component.scss',
})
export class ClientTypesComponent {
  addClientDocument() {
    console.log('added');
  }
}

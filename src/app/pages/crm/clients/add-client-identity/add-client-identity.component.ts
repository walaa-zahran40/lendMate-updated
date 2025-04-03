import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client-identity',
  standalone: false,
  templateUrl: './add-client-identity.component.html',
  styleUrl: './add-client-identity.component.scss',
})
export class AddClientIdentityComponent {
  addClient = true;
  saveInfo() {
    console.log('saved');
  }
}

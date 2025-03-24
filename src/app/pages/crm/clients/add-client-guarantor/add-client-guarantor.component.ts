import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client-guarantor',
  standalone: false,
  templateUrl: './add-client-guarantor.component.html',
  styleUrl: './add-client-guarantor.component.scss',
})
export class AddClientGuarantorComponent {
  addClient = true;
  saveInfo() {
    console.log('saved');
  }
}

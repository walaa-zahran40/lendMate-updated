import { Component } from '@angular/core';

@Component({
  selector: 'app-add-sme-client-code',
  standalone: false,
  templateUrl: './add-sme-client-code.component.html',
  styleUrl: './add-sme-client-code.component.scss',
})
export class AddSmeClientCodeComponent {
  addSMEClientCode() {
    console.log('added');
  }
}

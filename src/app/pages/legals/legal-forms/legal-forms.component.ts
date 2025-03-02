import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-forms',
  standalone: false,
  templateUrl: './legal-forms.component.html',
  styleUrl: './legal-forms.component.scss',
})
export class LegalFormsComponent {
  addLegalForms() {
    console.log('added');
  }
}

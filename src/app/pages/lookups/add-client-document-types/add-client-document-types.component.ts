import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client-document-types',
  standalone: false,
  templateUrl: './add-client-document-types.component.html',
  styleUrl: './add-client-document-types.component.scss',
})
export class AddClientDocumentTypesComponent {
  addClientDocument() {
    console.log('added');
  }
}

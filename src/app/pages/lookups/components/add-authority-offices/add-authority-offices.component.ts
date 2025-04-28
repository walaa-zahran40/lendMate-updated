import { Component } from '@angular/core';

@Component({
  selector: 'app-add-authority-offices',
  standalone: false,
  templateUrl: './add-authority-offices.component.html',
  styleUrl: './add-authority-offices.component.scss',
})
export class AddAuthorityOfficesComponent {
  addAuthorityOffices() {
    console.log('added');
  }
}

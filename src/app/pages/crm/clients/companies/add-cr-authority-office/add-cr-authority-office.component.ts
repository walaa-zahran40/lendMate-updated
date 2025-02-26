import { Component } from '@angular/core';

@Component({
  selector: 'app-add-cr-authority-office',
  standalone: false,
  templateUrl: './add-cr-authority-office.component.html',
  styleUrl: './add-cr-authority-office.component.scss',
})
export class AddCrAuthorityOfficeComponent {
  addCrOffices() {
    console.log('added');
  }
}

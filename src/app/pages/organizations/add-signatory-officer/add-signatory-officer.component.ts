import { Component } from '@angular/core';

@Component({
  selector: 'app-add-signatory-officer',
  standalone: false,
  templateUrl: './add-signatory-officer.component.html',
  styleUrl: './add-signatory-officer.component.scss',
})
export class AddSignatoryOfficerComponent {
  addDepartmentManager() {
    console.log('added');
  }
}

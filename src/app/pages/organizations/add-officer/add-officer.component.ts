import { Component } from '@angular/core';

@Component({
  selector: 'app-add-officer',
  standalone: false,
  templateUrl: './add-officer.component.html',
  styleUrl: './add-officer.component.scss',
})
export class AddOfficerComponent {
  addDepartmentManager() {
    console.log('added');
  }
}

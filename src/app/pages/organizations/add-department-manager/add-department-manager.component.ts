import { Component } from '@angular/core';

@Component({
  selector: 'app-add-department-manager',
  standalone: false,
  templateUrl: './add-department-manager.component.html',
  styleUrl: './add-department-manager.component.scss',
})
export class AddDepartmentManagerComponent {
  addDepartmentManager() {
    console.log('added');
  }
}

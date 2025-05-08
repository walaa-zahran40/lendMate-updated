import { Component } from '@angular/core';

@Component({
  selector: 'app-add-role',
  standalone: false,
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss',
})
export class AddRoleComponent {
  addRole() {
    console.log('added');
  }
}

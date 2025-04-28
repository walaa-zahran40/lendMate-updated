import { Component } from '@angular/core';

@Component({
  selector: 'app-add-branch-officers',
  standalone: false,
  templateUrl: './add-branch-officers.component.html',
  styleUrl: './add-branch-officers.component.scss',
})
export class AddBranchOfficersComponent {
  addBranchOfficers() {
    console.log('added');
  }
}

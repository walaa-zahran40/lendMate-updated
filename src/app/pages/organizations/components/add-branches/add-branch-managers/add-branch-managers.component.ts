import { Component } from '@angular/core';

@Component({
  selector: 'app-add-branch-managers',
  standalone: false,
  templateUrl: './add-branch-managers.component.html',
  styleUrl: './add-branch-managers.component.scss',
})
export class AddBranchManagersComponent {
  addBranchManagers() {
    console.log('added');
  }
}

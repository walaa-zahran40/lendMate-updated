import { Component } from '@angular/core';

@Component({
  selector: 'app-add-branch',
  standalone: false,
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.scss',
})
export class AddBranchComponent {
  addBranches() {
    console.log('added');
  }
}

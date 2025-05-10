import { Component } from '@angular/core';

@Component({
  selector: 'app-add-branch-addresses',
  standalone: false,
  templateUrl: './add-branch-addresses.component.html',
  styleUrl: './add-branch-addresses.component.scss',
})
export class AddBranchAddressesComponent {
  addBranchAddresses() {
    console.log('added');
  }
}

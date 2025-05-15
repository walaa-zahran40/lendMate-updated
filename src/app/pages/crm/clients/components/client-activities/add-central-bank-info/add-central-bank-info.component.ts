import { Component } from '@angular/core';

@Component({
  selector: 'app-add-central-bank-info',
  standalone: false,
  templateUrl: './add-central-bank-info.component.html',
  styleUrl: './add-central-bank-info.component.scss',
})
export class AddCentralBankInfoComponent {
  addCentralBankInfo() {
    console.log('added');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-tml-officer',
  standalone: false,
  templateUrl: './add-tml-officer.component.html',
  styleUrl: './add-tml-officer.component.scss',
})
export class AddTmlOfficerComponent {
  addTMLOfficers() {
    console.log('added');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-add-mandate-statuses',
  standalone: false,
  templateUrl: './add-mandate-statuses.component.html',
  styleUrl: './add-mandate-statuses.component.scss',
})
export class AddMandateStatusesComponent {
  addMandateStatuses() {
    console.log('added');
  }
}

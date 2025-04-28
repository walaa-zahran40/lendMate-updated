import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client-statuses',
  standalone: false,
  templateUrl: './add-client-statuses.component.html',
  styleUrl: './add-client-statuses.component.scss',
})
export class AddClientStatusesComponent {
  addClientStatuses() {
    console.log('added');
  }
}

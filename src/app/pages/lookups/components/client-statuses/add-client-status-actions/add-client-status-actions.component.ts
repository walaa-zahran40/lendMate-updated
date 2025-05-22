import { Component } from '@angular/core';

@Component({
  selector: 'app-add-client-status-actions',
  standalone: false,
  templateUrl: './add-client-status-actions.component.html',
  styleUrl: './add-client-status-actions.component.scss',
})
export class AddClientStatusActionsComponent {
  addClientStatusActions() {
    console.log('added');
  }
}

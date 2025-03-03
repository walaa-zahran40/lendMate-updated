import { Component } from '@angular/core';

@Component({
  selector: 'app-add-followup-types',
  standalone: false,
  templateUrl: './add-followup-types.component.html',
  styleUrl: './add-followup-types.component.scss',
})
export class AddFollowupTypesComponent {
  addFollowUpTypes() {
    console.log('added');
  }
}

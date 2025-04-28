import { Component } from '@angular/core';

@Component({
  selector: 'app-add-meeting-types',
  standalone: false,
  templateUrl: './add-meeting-types.component.html',
  styleUrl: './add-meeting-types.component.scss',
})
export class AddMeetingTypesComponent {
  addMeetingTypes() {
    console.log('added');
  }
}

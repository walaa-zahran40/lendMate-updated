import { Component } from '@angular/core';

@Component({
  selector: 'app-add-meeting',
  standalone: false,
  templateUrl: './add-meeting.component.html',
  styleUrl: './add-meeting.component.scss',
})
export class AddMeetingComponent {
  saveInfo() {
    console.log('added');
  }
}

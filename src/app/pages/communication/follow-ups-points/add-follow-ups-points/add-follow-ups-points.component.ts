import { Component } from '@angular/core';

@Component({
  selector: 'app-add-follow-ups-points',
  standalone: false,
  templateUrl: './add-follow-ups-points.component.html',
  styleUrl: './add-follow-ups-points.component.scss',
})
export class AddFollowUpsPointsComponent {
  addFollowUpsPoint() {
    console.log('added');
  }
}

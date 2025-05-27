import { Component } from '@angular/core';

@Component({
  selector: 'app-add-follow-ups',
  standalone: false,
  templateUrl: './add-follow-ups.component.html',
  styleUrl: './add-follow-ups.component.scss',
})
export class AddFollowUpsComponent {
  addFollowUps() {
    console.log('added');
  }
}

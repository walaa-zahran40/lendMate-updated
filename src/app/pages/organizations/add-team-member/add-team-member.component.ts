import { Component } from '@angular/core';

@Component({
  selector: 'app-add-team-member',
  standalone: false,
  templateUrl: './add-team-member.component.html',
  styleUrl: './add-team-member.component.scss',
})
export class AddTeamMemberComponent {
  addTeamMember() {
    console.log('added');
  }
}

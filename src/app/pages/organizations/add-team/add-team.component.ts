import { Component } from '@angular/core';

@Component({
  selector: 'app-add-team',
  standalone: false,
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss',
})
export class AddTeamComponent {
  addTeam() {
    console.log('added');
  }
}

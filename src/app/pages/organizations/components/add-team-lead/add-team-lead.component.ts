import { Component } from '@angular/core';

@Component({
  selector: 'app-add-team-lead',
  standalone: false,
  templateUrl: './add-team-lead.component.html',
  styleUrl: './add-team-lead.component.scss',
})
export class AddTeamLeadComponent {
  addTeamLead() {
    console.log('added');
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard-teams',
  standalone: false,
  templateUrl: './wizard-teams.component.html',
  styleUrl: './wizard-teams.component.scss',
})
export class WizardTeamsComponent {
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/department.svg',
          imgAlt: 'team Lead',
          title: 'Team Lead',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
        {
          imgUrl: '/assets/images/shared/card/team.svg',
          imgAlt: 'team Members',
          title: 'Team Members',
          content:
            'Introduce your company core info quickly to users by fill up company details',
        },
      ],
    ];
  }
}

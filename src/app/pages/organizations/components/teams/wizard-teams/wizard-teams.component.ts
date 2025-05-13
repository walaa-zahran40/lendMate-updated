import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard-teams',
  standalone: false,
  templateUrl: './wizard-teams.component.html',
  styleUrl: './wizard-teams.component.scss',
})
export class WizardTeamsComponent {
  cards: any[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/department.svg',
          imgAlt: 'team Leads',
          title: 'Team Leads',
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
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}

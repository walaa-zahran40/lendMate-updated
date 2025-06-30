import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-teams',
  standalone: false,
  templateUrl: './wizard-teams.component.html',
  styleUrl: './wizard-teams.component.scss',
})
export class WizardTeamsComponent {
  cards: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    this.cards = [
      [
        {
          imgUrl: '/assets/images/shared/card/department.svg',
          imgAlt: 'team Leads',
          title: 'Team Leads',
          content: '',
          link: `/organizations/view-team-lead-officers/${teamId}`,
        },
        {
          imgUrl: '/assets/images/shared/card/team.svg',
          imgAlt: 'team Members',
          title: 'Team Members',
          content: '',
          link: `/organizations/view-team-officers/${teamId}`,
        },
      ],
    ];
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}

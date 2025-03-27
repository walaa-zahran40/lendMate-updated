import { Component } from '@angular/core';
import { TeamMember } from '../../../shared/interfaces/team-member.interface';

@Component({
  selector: 'app-view-team-member',
  standalone: false,
  templateUrl: './view-team-member.component.html',
  styleUrl: './view-team-member.component.scss',
})
export class ViewTeamMemberComponent {
  tableDataInside: TeamMember[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'team', header: 'Team' },
      { field: 'officer', header: 'Officer' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
      {
        team: 501,
        officer: 'Mohamed',
        startDate: new Date('10-12-2025'),
        nameEN: 'ahmed',
        nameAR: 'أحمد',
      },
    ];
  }
}

import { Component } from '@angular/core';
import { TeamLead } from '../../../../shared/interfaces/team-lead.interface';

@Component({
  selector: 'app-view-team-lead',
  standalone: false,
  templateUrl: './view-team-lead.component.html',
  styleUrl: './view-team-lead.component.scss',
})
export class ViewTeamLeadComponent {
  tableDataInside: TeamLead[] = [];
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

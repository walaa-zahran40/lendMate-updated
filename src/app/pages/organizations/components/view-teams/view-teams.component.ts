import { Component } from '@angular/core';
import { Team } from '../../../../shared/interfaces/teams.interface';

@Component({
  selector: 'app-view-teams',
  standalone: false,
  templateUrl: './view-teams.component.html',
  styleUrl: './view-teams.component.scss',
})
export class ViewTeamsComponent {
  tableDataInside: Team[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'active', header: 'Active' },
      { field: 'department', header: 'Department' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
    ];
  }
}

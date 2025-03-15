import { Component } from '@angular/core';
import { Team } from '../../../shared/interfaces/teams.interface';

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
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'active', header: 'Active' },
      { field: 'department', header: 'Department' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        active: true,
        department: 'Department',
      },
    ];
  }
}

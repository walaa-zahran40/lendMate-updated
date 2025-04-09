import { Component } from '@angular/core';
import { TMLOfficer } from '../../../../shared/interfaces/tml-officer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-tml-officer',
  standalone: false,
  templateUrl: './view-tml-officer.component.html',
  styleUrl: './view-tml-officer.component.scss',
})
export class ViewTmlOfficerComponent {
  tableDataInside: TMLOfficer[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'officerType', header: 'Officer Type' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officerType: 'Type',
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
  addTMLOfficer() {
    this.router.navigate(['/crm/clients/add-tml-officer']);
  }
}

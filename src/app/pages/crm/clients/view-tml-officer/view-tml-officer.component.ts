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
      { field: 'officerName', header: 'Officer Name' },
      { field: 'officerType', header: 'Officer Type' },
    ];
    this.tableDataInside = [
      {
        officerName: 'Name',
        officerType: 'Type',
      },
      {
        officerName: 'Name',
        officerType: 'Type',
      },
      {
        officerName: 'Name',
        officerType: 'Type',
      },
      {
        officerName: 'Name',
        officerType: 'Type',
      },
      {
        officerName: 'Name',
        officerType: 'Type',
      },
      {
        officerName: 'Name',
        officerType: 'Type',
      },
      {
        officerName: 'Name',
        officerType: 'Type',
      },
    ];
  }
  addTMLOfficer() {
    this.router.navigate(['/crm/clients/add-tml-officer']);
  }
}

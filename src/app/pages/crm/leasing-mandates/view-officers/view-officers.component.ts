import { Component } from '@angular/core';
import { Officer } from '../../../../shared/interfaces/officer.interface';

@Component({
  selector: 'app-view-officers',
  standalone: false,
  templateUrl: './view-officers.component.html',
  styleUrl: './view-officers.component.scss',
})
export class ViewOfficersComponent {
  tableDataInside: Officer[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'officerName', header: 'OfName' },
      { field: 'officerType', header: 'ofType' },
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
    ];
  }
}

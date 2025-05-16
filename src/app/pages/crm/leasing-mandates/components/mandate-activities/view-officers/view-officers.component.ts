import { Component } from '@angular/core';
import { Officer } from '../../../../../../shared/interfaces/officer.interface';

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
      { field: 'officerType', header: 'officerType' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        officerType: 'Type',
        nameEN: 'Type',
        nameAR: 'Type',
      },
      {
        officerType: 'Type',
        nameEN: 'Type',
        nameAR: 'Type',
      },
      {
        officerType: 'Type',
        nameEN: 'Type',
        nameAR: 'Type',
      },
      {
        officerType: 'Type',
        nameEN: 'Type',
        nameAR: 'Type',
      },
      {
        officerType: 'Type',
        nameEN: 'Type',
        nameAR: 'Type',
      },
      {
        officerType: 'Type',
        nameEN: 'Type',
        nameAR: 'Type',
      },
    ];
  }
}

import { Component } from '@angular/core';
import { Officers } from '../../../shared/interfaces/officers.interface';
import { OfficersCommunication } from '../../../shared/interfaces/officers-communication.interface';

@Component({
  selector: 'app-view-officers',
  standalone: false,
  templateUrl: './view-officers.component.html',
  styleUrl: './view-officers.component.scss',
})
export class ViewOfficersComponent {
  tableDataInside: OfficersCommunication[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'officer', header: 'Officer' },
      { field: 'isResponsible', header: 'Is Responsible' },
      { field: 'mustAttend', header: 'Must Attend' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        officer: 122,
        isResponsible: true,
        mustAttend: true,

        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officer: 122,
        isResponsible: true,
        mustAttend: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        officer: 122,
        isResponsible: true,
        mustAttend: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
}

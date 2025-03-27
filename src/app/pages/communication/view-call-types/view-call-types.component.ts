import { Component } from '@angular/core';
import { MeetingTypes } from '../../../shared/interfaces/meeting-types.interface';

@Component({
  selector: 'app-view-call-types',
  standalone: false,
  templateUrl: './view-call-types.component.html',
  styleUrl: './view-call-types.component.scss',
})
export class ViewCallTypesComponent {
  tableDataInside: MeetingTypes[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 421421421,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 421421421,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
      {
        code: 421421421,
        nameEN: 'Mohamed',
        nameAR: 'Type',
        active: true,
      },
    ];
  }
}

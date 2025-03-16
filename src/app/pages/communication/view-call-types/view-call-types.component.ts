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
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 454536,
        code: 421421421,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 454536,
        code: 421421421,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
      {
        id: 454536,
        code: 421421421,
        name: 'Mohamed',
        arabicName: 'Type',
        active: true,
      },
    ];
  }
}

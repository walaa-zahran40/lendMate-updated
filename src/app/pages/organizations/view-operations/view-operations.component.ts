import { Component } from '@angular/core';
import { Operations } from '../../../shared/interfaces/operations.interface';

@Component({
  selector: 'app-view-operations',
  standalone: false,
  templateUrl: './view-operations.component.html',
  styleUrl: './view-operations.component.scss',
})
export class ViewOperationsComponent {
  tableDataInside: Operations[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'url', header: 'URL' },
      { field: 'description', header: 'Description' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        id: 1,
        code: 3485,
        name: 'Mohamed',
        arabicName: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
    ];
  }
}

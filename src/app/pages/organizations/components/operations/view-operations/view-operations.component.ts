import { Component } from '@angular/core';
import { Operations } from '../../../../../shared/interfaces/operations.interface';

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
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'url', header: 'URL' },
      { field: 'description', header: 'Description' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
      {
        code: 3485,
        nameEN: 'Mohamed',
        nameAR: 'Mohamed',
        url: new URL('https://www.fwagfwa.cvfo'),
        description: 'Description',
        active: true,
      },
    ];
  }
}

import { Component } from '@angular/core';
import { PageOperations } from '../../../shared/interfaces/page-operations.interface';

@Component({
  selector: 'app-view-page-operations',
  standalone: false,
  templateUrl: './view-page-operations.component.html',
  styleUrl: './view-page-operations.component.scss',
})
export class ViewPageOperationsComponent {
  tableDataInside: PageOperations[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'pageId', header: 'Page ID' },
      { field: 'operationId', header: 'Operation ID' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
      {
        id: 1,
        code: 3465,
        pageId: 'Mohamed',
        operationId: 536652665,
        active: true,
      },
    ];
  }
}

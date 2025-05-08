import { Component } from '@angular/core';
import { PageOperations } from '../../../../shared/interfaces/page-operations.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-page-operations',
  standalone: false,
  templateUrl: './view-page-operations.component.html',
  styleUrl: './view-page-operations.component.scss',
})
export class ViewPageOperationsComponent {
  tableDataInside: PageOperations[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'pageName', header: 'Page Name' },
      { field: 'operationName', header: 'Operation Name' },
      { field: 'active', header: 'Active' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
      {
        code: 1,
        pageName: '3465',
        operationName: 'Mohamed',
        active: true,
        nameEN: 'HAMEME',
        nameAR: 'SSSS',
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/organizations/add-page-operation']);
  }
}

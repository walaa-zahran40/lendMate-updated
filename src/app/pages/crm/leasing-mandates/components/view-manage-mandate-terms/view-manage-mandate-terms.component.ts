import { Component } from '@angular/core';
import { ManageMandate } from '../../../../../shared/interfaces/manage-mandate.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-manage-mandate-terms',
  standalone: false,
  templateUrl: './view-manage-mandate-terms.component.html',
  styleUrl: './view-manage-mandate-terms.component.scss',
})
export class ViewManageMandateTermsComponent {
  tableDataInside: ManageMandate[] = [];
  constructor(private router: Router) {}
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'termKey', header: 'Term Key' },
      { field: 'description', header: 'Description' },
      { field: 'isActive', header: 'IsActive' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
        nameEN: 'nameEN',
        nameAR: 'nameAR',
      },
    ];
  }
  addMandate() {
    this.router.navigate(['/crm/leasing-mandates/add-manage-mandate-terms']);
  }
}

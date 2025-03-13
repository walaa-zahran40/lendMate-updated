import { Component } from '@angular/core';
import { ManageMandate } from '../../../../shared/interfaces/manage-mandate.interface';

@Component({
  selector: 'app-view-manage-mandate-terms',
  standalone: false,
  templateUrl: './view-manage-mandate-terms.component.html',
  styleUrl: './view-manage-mandate-terms.component.scss',
})
export class ViewManageMandateTermsComponent {
  tableDataInside: ManageMandate[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'termKey', header: 'Term Key' },
      { field: 'description', header: 'Description' },
      { field: 'isActive', header: 'IsActive' },
    ];
    this.tableDataInside = [
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
      {
        termKey: 1,
        description: 'Description',
        isActive: true,
      },
    ];
  }
}

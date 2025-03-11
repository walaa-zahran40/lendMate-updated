import { Component } from '@angular/core';
import { Mandate } from '../../../../shared/interfaces/mandate.interface';

@Component({
  selector: 'app-view-mandate',
  standalone: false,
  templateUrl: './view-mandate.component.html',
  styleUrl: './view-mandate.component.scss',
})
export class ViewMandateComponent {
  tableDataInside: Mandate[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'clientName', header: 'Client Name' },
      { field: 'startDate', header: 'Start Date' },
    ];
    this.tableDataInside = [
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
      {
        code: 501,
        description: 'Mandate Description',
        clientName: 'Company 1',
        startDate: new Date('01/01/2025'),
      },
    ];
  }
}

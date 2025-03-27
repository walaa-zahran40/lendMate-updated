import { Component } from '@angular/core';
import { Mandate } from '../../../../shared/interfaces/mandate.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-mandate',
  standalone: false,
  templateUrl: './view-mandate.component.html',
  styleUrl: './view-mandate.component.scss',
})
export class ViewMandateComponent {
  tableDataInside: Mandate[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
      {
        code: 501,
        description: 'Mandate Description',
        startDate: new Date('01/01/2025'),
        nameEN: 'Company 1',
        nameAR: 'Company 1',
      },
    ];
  }
  addMandate() {
    this.router.navigate(['/crm/leasing-mandates/add-mandate']);
  }
  onAddSide() {
    this.router.navigate(['/crm/leasing-mandates/wizard']);
  }
}

import { Component } from '@angular/core';
import { LegalFormLaw } from '../../../shared/interfaces/legal-form-law.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-legal-form-law',
  standalone: false,
  templateUrl: './view-legal-form-law.component.html',
  styleUrl: './view-legal-form-law.component.scss',
})
export class ViewLegalFormLawComponent {
  tableDataInside: LegalFormLaw[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'legalFormCode', header: 'Legal Form Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        active: true,
      },
    ];
  }
  addLegalFormLaw() {
    this.router.navigate(['/legals/add-legal-forms-law']);
  }
}

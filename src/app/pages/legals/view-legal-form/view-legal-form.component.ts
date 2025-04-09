import { Component } from '@angular/core';
import { LegalForm } from '../../../shared/interfaces/legal-form.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-legal-form',
  standalone: false,
  templateUrl: './view-legal-form.component.html',
  styleUrl: './view-legal-form.component.scss',
})
export class ViewLegalFormComponent {
  tableDataInside: LegalForm[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'legalFormCode', header: 'Legal Form Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
      {
        code: 501,
        legalFormCode: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
      },
    ];
  }
  addLegalForm() {
    this.router.navigate(['/legals/add-legal-forms']);
  }
}

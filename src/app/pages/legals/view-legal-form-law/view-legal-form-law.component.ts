import { Component } from '@angular/core';
import { LegalFormLaw } from '../../../shared/interfaces/legal-form-law.interface';

@Component({
  selector: 'app-view-legal-form-law',
  standalone: false,
  templateUrl: './view-legal-form-law.component.html',
  styleUrl: './view-legal-form-law.component.scss',
})
export class ViewLegalFormLawComponent {
  tableDataInside: LegalFormLaw[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'legalFormCode', header: 'Legal Form Code' },
      { field: 'nameInEnglish', header: 'Name in English' },
      { field: 'nameInArabic', header: 'Name in Arabic' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
        active: true,
      },
    ];
  }
}

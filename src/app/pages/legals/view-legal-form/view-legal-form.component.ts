import { Component } from '@angular/core';
import { LegalForm } from '../../../shared/interfaces/legal-form.interface';

@Component({
  selector: 'app-view-legal-form',
  standalone: false,
  templateUrl: './view-legal-form.component.html',
  styleUrl: './view-legal-form.component.scss',
})
export class ViewLegalFormComponent {
  tableDataInside: LegalForm[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'legalFormCode', header: 'Legal Form Code' },
      { field: 'nameInEnglish', header: 'Name in English' },
      { field: 'nameInArabic', header: 'Name in Arabic' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
      {
        id: 501,
        legalFormCode: 344535,
        nameInEnglish: 'Name',
        nameInArabic: 'Name in Arabic',
      },
    ];
  }
}

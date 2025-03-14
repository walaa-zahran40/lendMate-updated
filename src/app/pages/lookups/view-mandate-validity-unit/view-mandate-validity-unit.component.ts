import { Component } from '@angular/core';
import { MandateValidityUnit } from '../../../shared/interfaces/mandate-validity-unit.interface';

@Component({
  selector: 'app-view-mandate-validity-unit',
  standalone: false,
  templateUrl: './view-mandate-validity-unit.component.html',
  styleUrl: './view-mandate-validity-unit.component.scss',
})
export class ViewMandateValidityUnitComponent {
  tableDataInside: MandateValidityUnit[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'validationMin', header: 'Validation Min' },
      { field: 'validationMax', header: 'Validation Max' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 15,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
    ];
  }
}

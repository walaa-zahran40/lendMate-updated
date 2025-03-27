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
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'validationMin', header: 'Validation Min' },
      { field: 'validationMax', header: 'Validation Max' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        validationMin: 10,
        validationMax: 50,
        active: true,
      },
    ];
  }
}

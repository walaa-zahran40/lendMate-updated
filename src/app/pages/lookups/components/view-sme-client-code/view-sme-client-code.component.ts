import { Component } from '@angular/core';
import { SMEClientCode } from '../../../../shared/interfaces/sme-client-code.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sme-client-code',
  standalone: false,
  templateUrl: './view-sme-client-code.component.html',
  styleUrl: './view-sme-client-code.component.scss',
})
export class ViewSmeClientCodeComponent {
  tableDataInside: SMEClientCode[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'upperLimit', header: 'Upper Limit' },
      { field: 'lowerLimit', header: 'Lower Limit' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        code: 344535,
        nameEN: 'Name',
        nameAR: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
    ];
  }
  onAdd() {
    this.router.navigate(['/lookups/add-sme-client-code']);
  }
}

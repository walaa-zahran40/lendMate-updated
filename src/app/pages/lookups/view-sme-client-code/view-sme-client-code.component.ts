import { Component } from '@angular/core';
import { SMEClientCode } from '../../../shared/interfaces/sme-client-code.interface';
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
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'arabicName', header: 'Arabic Name' },
      { field: 'upperLimit', header: 'Upper Limit' },
      { field: 'lowerLimit', header: 'Lower Limit' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
        upperLimit: 50,
        lowerLimit: 10,
        active: true,
      },
      {
        id: 501,
        code: 344535,
        name: 'Name',
        arabicName: 'Name in Arabic',
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

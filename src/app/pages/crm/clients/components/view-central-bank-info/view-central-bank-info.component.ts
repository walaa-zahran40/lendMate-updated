import { Component } from '@angular/core';
import { CentralBankInfo } from '../../../../../shared/interfaces/central-bank-info.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-central-bank-info',
  standalone: false,
  templateUrl: './view-central-bank-info.component.html',
  styleUrl: './view-central-bank-info.component.scss',
})
export class ViewCentralBankInfoComponent {
  tableDataInside: CentralBankInfo[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'date', header: 'Date' },
      { field: 'companyName', header: 'Company Name' },
      { field: 'companyType', header: 'Company Type' },
      { field: 'cbeCode', header: 'CBE Code' },
      { field: 'isActive', header: 'IsActive' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        date: new Date('11/11/2024'),
        companyName: '421421421',
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
  onAddCentralBankInfo() {
    this.router.navigate(['/crm/clients/add-central-bank-info']);
  }
}

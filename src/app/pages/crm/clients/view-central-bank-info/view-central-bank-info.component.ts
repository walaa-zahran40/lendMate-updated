import { Component } from '@angular/core';
import { CentralBankInfo } from '../../../../shared/interfaces/central-bank-info.interface';

@Component({
  selector: 'app-view-central-bank-info',
  standalone: false,
  templateUrl: './view-central-bank-info.component.html',
  styleUrl: './view-central-bank-info.component.scss',
})
export class ViewCentralBankInfoComponent {
  tableDataInside: CentralBankInfo[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'date', header: 'Date' },
      { field: 'clientId', header: 'Client ID' },
      { field: 'companyCodeId', header: 'Company Code ID' },
      { field: 'companyType', header: 'Company Type' },
      { field: 'cbeCode', header: 'CBE Code' },
      { field: 'isActive', header: 'IsActive' },
    ];
    this.tableDataInside = [
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
      {
        date: new Date('11/11/2024'),
        clientId: 421421421,
        companyCodeId: 1345,
        companyType: 'Type',
        cbeCode: 42525,
        isActive: true,
      },
    ];
  }
}

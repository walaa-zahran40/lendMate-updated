import { Component } from '@angular/core';
import { TaxAuthorityOffice } from '../../../../../../shared/interfaces/tax-authority-office.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-tax-authority-office',
  standalone: false,
  templateUrl: './view-tax-authority-office.component.html',
  styleUrl: './view-tax-authority-office.component.scss',
})
export class ViewTaxAuthorityOfficeComponent {
  tableDataInside: TaxAuthorityOffice[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'amount', header: 'Amount' },
      { field: 'date', header: 'Date' },
    ];

    this.tableDataInside = [
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
      {
        taxNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        nameEN: 'String',
        nameAR: 'String',
        taxAuthorityOfficeName: '12345',
      },
    ];
  }
  addTaxAuthorityOffice() {
    this.router.navigate(['/crm/clients/add-tax-authority-office']);
  }
}

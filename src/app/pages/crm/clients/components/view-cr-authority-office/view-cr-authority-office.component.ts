import { Component } from '@angular/core';
import { CRAuthorityOffice } from '../../../../../shared/interfaces/cr-authority-office.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cr-authority-office',
  standalone: false,
  templateUrl: './view-cr-authority-office.component.html',
  styleUrl: './view-cr-authority-office.component.scss',
})
export class ViewCrAuthorityOfficeComponent {
  tableDataInside: CRAuthorityOffice[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'crNumber', header: 'CR Number' },
      { field: 'expiryDate', header: 'Expiry Date' },
      { field: 'clientCode', header: 'Client Code' },
      { field: 'crAuthorityOfficeName', header: 'CR Authority Office Name' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
      {
        crNumber: 432532532532,
        expiryDate: new Date('11/24/2024'),
        clientCode: 34245352,
        crAuthorityOfficeName: '12345',
        nameAR: 'name ar',
        nameEN: 'name en',
      },
    ];
  }
  addCR() {
    this.router.navigate(['/crm/clients/add-cr-authority-office']);
  }
}

import { Component } from '@angular/core';
import { PhoneNumber } from '../../../../shared/interfaces/phone-number.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-phone-number',
  standalone: false,
  templateUrl: './view-phone-number.component.html',
  styleUrl: './view-phone-number.component.scss',
})
export class ViewPhoneNumberComponent {
  tableDataInside: PhoneNumber[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'phoneType', header: 'Phone Type' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ];
    this.tableDataInside = [
      {
        nameEN: 'client name',
        nameAR: 'name ar',
        phoneType: 'Type',
        phoneNumber: 1148000512,
      },
      {
        nameEN: 'client name',
        nameAR: 'name ar',
        phoneType: 'Type',
        phoneNumber: 1148000512,
      },
    ];
  }
  addPhone() {
    this.router.navigate(['/crm/clients/add-phone-number']);
  }
}

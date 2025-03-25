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
      { field: 'phoneType', header: 'Phone Type' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ];
    this.tableDataInside = [
      {
        phoneType: 'Type',
        phoneNumber: 1148000512,
      },
      {
        phoneType: 'Type',
        phoneNumber: 1148000512,
      },
    ];
  }
  addPhone() {
    this.router.navigate(['/crm/clients/add-phone-number']);
  }
}

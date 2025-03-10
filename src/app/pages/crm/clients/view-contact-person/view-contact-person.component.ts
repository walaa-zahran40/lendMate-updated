import { Component } from '@angular/core';
import { ContactPerson } from '../../../../shared/interfaces/contact-person.interface';

@Component({
  selector: 'app-view-contact-person',
  standalone: false,
  templateUrl: './view-contact-person.component.html',
  styleUrl: './view-contact-person.component.scss',
})
export class ViewContactPersonComponent {
  tableDataInside: ContactPerson[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'nameEn', header: 'Name EN' },
      { field: 'contactId', header: 'Contact ID' },
      { field: 'isAuthorizedSign', header: 'IsAuthorized Sign' },
      { field: 'genderId', header: 'GenderID' },
    ];
    this.tableDataInside = [
      {
        nameEn: 'Hamdy Bank',
        contactId: 1005,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1006,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 2345,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1009,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1000,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1001,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1002,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1007,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 1003,
        isAuthorizedSign: true,
        genderId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        contactId: 4256,
        isAuthorizedSign: true,
        genderId: 12345,
      },
    ];
  }
}

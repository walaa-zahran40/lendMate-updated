import { Component } from '@angular/core';
import { ContactPerson } from '../../../../shared/interfaces/contact-person.interface';
import { Contact } from '../../../../shared/interfaces/contact.interface';

@Component({
  selector: 'app-view-contact-persons',
  standalone: false,
  templateUrl: './view-contact-persons.component.html',
  styleUrl: './view-contact-persons.component.scss',
})
export class ViewContactPersonsComponent {
  tableDataInside: Contact[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'contactPersonName', header: 'cName' },
      { field: 'contactPersonType', header: 'cType' },
    ];
    this.tableDataInside = [
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
      {
        contactPersonName: 'Name',
        contactPersonType: 'Type',
      },
    ];
  }
}

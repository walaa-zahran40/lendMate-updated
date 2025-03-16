import { Component } from '@angular/core';
import { ContactPersons } from '../../../shared/interfaces/contact-persons.interface';

@Component({
  selector: 'app-view-contact-persons',
  standalone: false,
  templateUrl: './view-contact-persons.component.html',
  styleUrl: './view-contact-persons.component.scss',
})
export class ViewContactPersonsComponent {
  tableDataInside: ContactPersons[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'contactPerson', header: 'Contact Person' },
      { field: 'mustAttend', header: 'Must Attend' },
    ];
    this.tableDataInside = [
      {
        contactPerson: 122,
        mustAttend: true,
      },
      {
        contactPerson: 122,
        mustAttend: true,
      },
      { contactPerson: 122, mustAttend: true },
    ];
  }
}

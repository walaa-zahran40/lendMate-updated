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
      { field: 'mustAttend', header: 'Must Attend' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        mustAttend: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        mustAttend: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
      {
        mustAttend: true,
        nameEN: 'name en',
        nameAR: 'name ar',
      },
    ];
  }
}

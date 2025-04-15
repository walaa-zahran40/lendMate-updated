import { Component } from '@angular/core';
import { ContactPerson } from '../../../../../shared/interfaces/contact-person.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-contact-person',
  standalone: false,
  templateUrl: './view-contact-person.component.html',
  styleUrl: './view-contact-person.component.scss',
})
export class ViewContactPersonComponent {
  tableDataInside: ContactPerson[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'isAuthorizedSign', header: 'IsAuthorized Sign' },
      { field: 'gender', header: 'Gender' },
    ];
    this.tableDataInside = [
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: '1005',
        isAuthorizedSign: true,
        gender: '12345',
      },
    ];
  }
  addContactPerson() {
    this.router.navigate(['/crm/clients/add-contact-person']);
  }
}

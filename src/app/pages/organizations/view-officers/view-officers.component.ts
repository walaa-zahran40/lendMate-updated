import { Component } from '@angular/core';
import { Officers } from '../../../shared/interfaces/officers.interface';

@Component({
  selector: 'app-view-officers',
  standalone: false,
  templateUrl: './view-officers.component.html',
  styleUrl: './view-officers.component.scss',
})
export class ViewOfficersComponent {
  tableDataInside: Officers[] = [];
  colsInside: any[] = [];

  ngOnInit() {
    this.colsInside = [
      { field: 'id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'loginName', header: 'Login Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'emailAddress', header: 'Email Address' },
      { field: 'active', header: 'Active' },
    ];
    this.tableDataInside = [
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
      {
        id: 1,
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
      },
    ];
  }
}

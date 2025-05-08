import { Component } from '@angular/core';
import { Officers } from '../../../../shared/interfaces/officers.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-officers',
  standalone: false,
  templateUrl: './view-officers.component.html',
  styleUrl: './view-officers.component.scss',
})
export class ViewOfficersComponent {
  tableDataInside: Officers[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.colsInside = [
      { field: 'code', header: 'Code' },
      { field: 'loginName', header: 'Login Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'email', header: 'Email Address' },
      { field: 'active', header: 'Active' },
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
    ];
    this.tableDataInside = [
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
      {
        code: 3435,
        loginName: 'Mohamed',
        phoneNumber: 4235132515,
        email: 'moyu@gmail.com',
        active: true,
        nameEN: 'sss',
        nameAR: 'sss',
      },
    ];
  }
  onAddOfficer() {
    this.router.navigate(['/organizations/add-officer']);
  }
}

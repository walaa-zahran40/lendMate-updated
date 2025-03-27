import { Component } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-clients',
  standalone: false,
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.scss',
})
export class ViewClientsComponent {
  tableDataInside: Client[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'businessActivity', header: 'Business Activity' },
      { field: 'isIscore', header: 'isIscore' },
      { field: 'taxName', header: 'Tax Name' },
    ];
    this.tableDataInside = [
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
      {
        nameEN: 'Hamdy Bank',
        nameAR: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxName: '12345',
      },
    ];
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-view-client-identity',
  standalone: false,
  templateUrl: './view-client-identity.component.html',
  styleUrl: './view-client-identity.component.scss',
})
export class ViewClientIdentityComponent {
  tableDataInside!: any;
  colsInside: any[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'idNumber', header: 'Identification Number' },
      { field: 'idTypeName', header: 'Identification Type Name' },
      { field: 'clientName', header: 'Client Name' },
      { field: 'isMain', header: 'isMain' },
    ];
    this.tableDataInside = [
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
      {
        idNumber: 'Hamdy Bank',
        idTypeName: 'Hamdy Bank',
        clientName: 'Food',
        isMain: true,
      },
    ];
  }

  onAddClientIdentity() {
    this.router.navigate(['/crm/clients/add-client-identity']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
  }
}

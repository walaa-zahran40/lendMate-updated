import { Component } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-view-clients',
  standalone: false,
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.scss',
})
export class ViewClientsComponent {
  tableDataInside: Client[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'nameEn', header: 'Name EN' },
      { field: 'businessActivity', header: 'Business Activity' },
      { field: 'isIscore', header: 'isIscore' },
      { field: 'taxId', header: 'Tax ID' },
    ];
    this.tableDataInside = [
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
      {
        nameEn: 'Hamdy Bank',
        businessActivity: 'Food',
        isIscore: true,
        taxId: 12345,
      },
    ];
  }
}

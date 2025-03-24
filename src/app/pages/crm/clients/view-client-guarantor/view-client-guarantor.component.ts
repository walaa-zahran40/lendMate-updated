import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-view-client-guarantor',
  standalone: false,
  templateUrl: './view-client-guarantor.component.html',
  styleUrl: './view-client-guarantor.component.scss',
})
export class ViewClientGuarantorComponent {
  tableDataInside: Client[] = [];
  colsInside: any[] = [];
  constructor(private router: Router) {}

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

  onAddClientGuarantor() {
    this.router.navigate(['/crm/clients/add-client-guarantor']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
  }
}

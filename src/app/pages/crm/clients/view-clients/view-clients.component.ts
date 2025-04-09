import { Component } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';
import { ClientsFacade } from '../state/clients/clients.facade';

@Component({
  selector: 'app-view-clients',
  standalone: false,
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.scss',
})
export class ViewClientsComponent {
  tableDataInside: Client[] = [];
  colsInside: any[] = [];
  constructor(private router: Router, private facade: ClientsFacade) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'name', header: 'Name EN' },
      { field: 'businessActivity', header: 'Business Activity' },
      { field: 'isIscore', header: 'Iscore' },
      { field: 'taxId', header: 'Tax ID' },
      { field: 'code', header: 'Client Code' },
      { field: 'clientTypeCode', header: 'Type Code' },
      { field: 'shortName', header: 'Short Name' },
      { field: 'isActive', header: 'Active' },
    ];

    this.tableDataInside = [
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
      // {
      //   nameEn: 'Hamdy Bank',
      //   businessActivity: 'Food',
      //   isIscore: true,
      //   taxId: 12345,
      // },
    ];
    this.facade.clients$.subscribe((clients) => {
      this.tableDataInside = clients;
    });

    this.facade.loadClients();
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
  }
  filterClients(searchText: string) {
    // const keyword = searchText.toLowerCase();
    // this.filteredTableData = this.tableDataInside.filter((client) => {
    //   return (
    //     client.nameEN.toLowerCase().includes(keyword) ||
    //     client.nameAR.toLowerCase().includes(keyword) ||
    //     client.businessActivity?.toLowerCase().includes(keyword) ||
    //     // Convert boolean to string so "true"/"false" can also match
    //     String(client.isIscore).toLowerCase().includes(keyword) ||
    //     client.taxName?.toLowerCase().includes(keyword)
    //   );
    // });
  }
}

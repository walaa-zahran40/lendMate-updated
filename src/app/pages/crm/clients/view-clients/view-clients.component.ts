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
  first2: number = 0;
  rows: number = 10;
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

    this.tableDataInside = [];
    this.facade.clients$.subscribe((clients) => {
      this.tableDataInside = clients;
      const totalRecords = clients.length;

      // Assume the new client is appended at the end:
      if (totalRecords > 0) {
        const newClientIndex = totalRecords - 1;
        const pageNumber = Math.floor(newClientIndex / this.rows);
        this.first2 = pageNumber * this.rows;
      }
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

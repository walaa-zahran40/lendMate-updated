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
  filteredTableData: Client[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.colsInside = [
      { field: 'nameEN', header: 'Name EN' },
      { field: 'nameAR', header: 'Name AR' },
      { field: 'businessActivity', header: 'Business Activity' },
      { field: 'isIscore', header: 'isIscore' },
      { field: 'taxName', header: 'Tax Name' },
    ];
    const storedClients = localStorage.getItem('allClients');
    if (storedClients) {
      const clientArray = JSON.parse(storedClients);
      // Merge all locally-stored clients with your existing tableData
      this.tableDataInside = this.tableDataInside.concat(clientArray);
    }
    this.filteredTableData = [...this.tableDataInside];
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
  }
  filterClients(searchText: string) {
    const keyword = searchText.toLowerCase();
    this.filteredTableData = this.tableDataInside.filter((client) => {
      return (
        client.nameEN.toLowerCase().includes(keyword) ||
        client.nameAR.toLowerCase().includes(keyword) ||
        client.businessActivity?.toLowerCase().includes(keyword) ||
        // Convert boolean to string so "true"/"false" can also match
        String(client.isIscore).toLowerCase().includes(keyword) ||
        client.taxName?.toLowerCase().includes(keyword)
      );
    });
  }
}

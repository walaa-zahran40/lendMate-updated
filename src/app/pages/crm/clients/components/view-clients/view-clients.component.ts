import { Component, ViewChild } from '@angular/core';
import { Client } from '../../../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientsFacade } from '../../store/clients/clients.facade';
import { TableComponent } from '../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-view-clients',
  standalone: false,
  templateUrl: './view-clients.component.html',
  styleUrl: './view-clients.component.scss',
})
export class ViewClientsComponent {
  tableDataInside: Client[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  clients$ = this.facade.clients$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'shortName', header: 'Short Name' },
    { field: 'businessActivity', header: 'Business Activity' },
    { field: 'isIscore', header: 'Iscore' },
    { field: 'taxId', header: 'Tax ID' },
    { field: 'clientTypeCode', header: 'Type' },
  ];
  showDeleteModal: boolean = false;
  selectedClientId: number | null = null;
  originalClients: Client[] = [];
  filteredClients: Client[] = [];

  constructor(private router: Router, private facade: ClientsFacade) {}
  ngOnInit() {
    this.facade.loadClients();

    this.clients$.pipe(takeUntil(this.destroy$)).subscribe((clients) => {
      const sorted = [...clients].sort((a, b) => b?.id! - a?.id!); // replace with b.createdAt - a.createdAt if you have timestamps

      this.originalClients = sorted;
      this.filteredClients = [...sorted]; // default to all
    });
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client']);
  }
  onAddSide(clientId: any) {
    this.router.navigate(['/crm/clients/client-activity-wizard', clientId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClient(clientId: number): void {
    this.selectedClientId = clientId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedClientId !== null) {
      this.facade.deleteClient(this.selectedClientId);
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedClientId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClients = this.originalClients.filter((client) =>
      Object.values(client).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClient(client: Client) {
    this.router.navigate(['/crm/clients/edit-client', client.id], {
      queryParams: { type: client.clientTypeCode },
    });
  }
}

import { Component } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';
import { Router } from '@angular/router';
import { ClientsFacade } from '../state/clients/clients.facade';
import { Subject, takeUntil } from 'rxjs';

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
  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'businessActivity', header: 'Business Activity' },
    { field: 'isIscore', header: 'Iscore' },
    { field: 'taxId', header: 'Tax ID' },
    { field: 'code', header: 'Client Code' },
    { field: 'clientTypeCode', header: 'Type Code' },
    { field: 'shortName', header: 'Short Name' },
    { field: 'isActive', header: 'Active' },
  ];
  showDeleteModal: boolean = false;
  selectedClientId: number | null = null;
  originalClients: Client[] = [];
  filteredClients: Client[] = [];

  constructor(private router: Router, private facade: ClientsFacade) {}

  ngOnInit() {
    this.facade.loadClients();

    this.clients$.pipe(takeUntil(this.destroy$)).subscribe((clients) => {
      this.originalClients = clients;
      this.filteredClients = [...clients]; // default to all
    });
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client']);
  }
  onAddSide() {
    this.router.navigate(['/crm/clients/client-activity-wizard']);
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
}

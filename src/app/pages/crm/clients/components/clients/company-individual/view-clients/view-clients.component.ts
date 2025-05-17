import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientsFacade } from '../../../../store/clients/clients.facade';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { Client } from '../../../../store/clients/client.model';

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
      console.log('raw clients from facade:', clients);
      clients.forEach((c) =>
        console.log(
          `> id=${c.id}`,
          `clientTypeCode(server)=${c.clientTypeCode}`,
          `code=${c.code}`,
          `clientTypeId=${(c as any).clientTypeId}`
        )
      );

      const sorted = [...clients].sort((a, b) => b.id! - a.id!);

      this.originalClients = sorted.map((c) => {
        // choose the field that actually exists:
        const mappedType = c.taxId ? 'Company' : 'Individual';
        const mappedTaxID = c.taxId ? c.taxId : 'N/A';
        const mappedIscore = c.taxId ? c.taxId : 'N/A';

        console.log(`mapped id=${c.id} → clientTypeCode=${mappedType}`);
        return {
          ...c,
          clientTypeCode: mappedType,
          taxId: mappedTaxID,
          isIscore: mappedIscore,
        };
      });

      console.log('originalClients after mapping:', this.originalClients);
      this.filteredClients = [...this.originalClients];
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
      queryParams: { type: client.clientTypeCode, mode: 'edit' },
    });
  }
  onViewClient(client: Client) {
    console.log('client', client);
    this.router.navigate(['/crm/clients/edit-client', client.id], {
      queryParams: { mode: 'view' },
    });
  }
}

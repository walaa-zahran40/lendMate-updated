import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { ClientOnboarding } from '../../../../store/_client-onboarding/allclients/client-onboarding.model';
import { ClientsOnboardingFacade } from '../../../../store/_client-onboarding/allclients/clients-onboarding.facade';

@Component({
  selector: 'app-view-clients-onboarding',
  standalone: false,
  templateUrl: './view-clients-onboarding.component.html',
  styleUrl: './view-clients-onboarding.component.scss',
})
export class ViewClientsOnboardingComponent {
  tableDataInside: ClientOnboarding[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  clients$ = this.facade.all$;
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
  originalClients: any[] = [];
  filteredClients: ClientOnboarding[] = [];

  constructor(
    private router: Router,
    private facade: ClientsOnboardingFacade // private facadeInd: IndividualsFacade
  ) {}
  ngOnInit() {
    this.facade.loadAll();
    // this.facadeInd.loadAll();
    this.clients$.pipe(takeUntil(this.destroy$)).subscribe((clients) => {
      console.log('raw clients from facade:', clients);
      clients.forEach((c) =>
        console.log(
          `> id=${c.id}`,
          `code=${c.code}`,
          `clientTypeId=${(c as any).clientTypeId}`
        )
      );

      const sorted = [...clients].sort((a, b) => b.id! - a.id!);

      this.originalClients = sorted.map((c) => {
        console.log(
          `client ${c} mapping client id=${c.id} → clientTypeId=${c.clientTypeId}`
        );
        // choose the field that actually exists:
        const mappedType = c.clientTypeId === 1 ? 'Company' : 'Individual';
        const mappedTaxID = c.taxId ? c.taxId : 'N/A';

        console.log(`mapped id=${c.id} → clientTypeCode=${mappedType}`);
        return {
          ...c,
          clientTypeCode: mappedType,
          taxId: mappedTaxID,
        };
      });

      console.log('originalClients after mapping:', this.originalClients);
      this.filteredClients = [...this.originalClients];
    });
  }

  onAddClient() {
    this.router.navigate(['/crm/clients/add-client-onboarding']);
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
      this.facade.delete(this.selectedClientId);
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
  onEditClient(client: ClientOnboarding) {
    this.router.navigate(['/crm/clients/edit-client-onboarding', client.id], {
      queryParams: {
        type: client.clientTypeId === 2 ? 'Individual' : 'Company',
        mode: 'edit',
      },
    });
  }
  onViewClient(client: ClientOnboarding) {
    console.log('client', client);
    this.router.navigate(['/crm/clients/edit-client-onboarding', client.id], {
      queryParams: {
        type: client.clientTypeId === 2 ? 'Individual' : 'Company',
        mode: 'view',
      },
    });
  }
}

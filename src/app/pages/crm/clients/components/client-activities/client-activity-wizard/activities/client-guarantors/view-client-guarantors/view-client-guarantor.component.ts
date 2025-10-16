import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../../../store/_clients/allclients/client.model';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  map,
  takeUntil,
  tap,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { loadAll } from '../../../../../../store/_clients/allclients/clients.actions';
import { selectAllClients } from '../../../../../../store/_clients/allclients/clients.selectors';
import { ClientGuarantorsFacade } from '../../../../../../store/client-guarantors/client-guarantors.facade';
import { ClientGuarantor } from '../../../../../../store/client-guarantors/client-guarantor.model';

@Component({
  selector: 'app-view-client-guarantor',
  standalone: false,
  templateUrl: './view-client-guarantor.component.html',
  styleUrl: './view-client-guarantor.component.scss',
})
export class ViewGuarantorsComponent {
  tableDataInside: ClientGuarantor[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'guarantorName', header: 'Guarantor Name' },
    { field: 'guarantorNameAR', header: 'Guarantor Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedGuarantorId: number | null = null;
  originalGuarantors: ClientGuarantor[] = [];
  filteredGuarantors: ClientGuarantor[] = [];
  guarantors$!: Observable<ClientGuarantor[]>;
  clientsList$!: Observable<Client[]>;

  constructor(
    private router: Router,
    private facade: ClientGuarantorsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  ngOnInit() {
    this.clientIdParam = Number(this.route.snapshot.paramMap.get('clientId'));

    // --- initial render from resolvers (so the page paints immediately)
    const clients = this.route.snapshot.data['clients'] as Client[];
    const guarantors = this.route.snapshot.data[
      'guarantors'
    ] as ClientGuarantor[];
    this.rebuildTable(clients, guarantors);

    // --- live updates: re-render whenever items$ changes
    this.facade.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => this.rebuildTable(clients, items)); // reuse same clients lookup
  }

  private rebuildTable(clients: Client[], guarantors: ClientGuarantor[]) {
    const clientsById = new Map(clients.map((c) => [c.id, c]));
    const withNames = guarantors
      .filter((g) => g.clientId === this.clientIdParam) // ensure same client
      .map((g) => {
        const c = clientsById.get(g.guarantorId);
        return {
          ...g,
          guarantorName: c?.name ?? g.guarantorName ?? '—',
          guarantorNameAR: c?.nameAR ?? g.guarantorNameAR ?? '—',
        };
      })
      .sort((a, b) => b.id - a.id);

    this.originalGuarantors = withNames;
    this.filteredGuarantors = [...withNames];
  }

  onAddGuarantor() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-guarantor'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteGuarantor(guarantorId: any): void {
    console.log(
      '[View] onDeleteGuarantore() – opening modal for id=',
      guarantorId
    );
    this.selectedIds = [guarantorId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedGuarantorId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredGuarantors = this.originalGuarantors.filter((guarantor) =>
      Object.values(guarantor).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditGuarantor(guarantor: ClientGuarantor) {
    this.router.navigate(['/crm/clients/edit-client-guarantor', guarantor.id], {
      queryParams: {
        mode: 'edit',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
  onViewGuarantor(ct: ClientGuarantor) {
    this.router.navigate(['/crm/clients/edit-client-guarantor', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.clientIdParam)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.facade.loadClientGuarantorsByClientId(this.clientIdParam);
  }

  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

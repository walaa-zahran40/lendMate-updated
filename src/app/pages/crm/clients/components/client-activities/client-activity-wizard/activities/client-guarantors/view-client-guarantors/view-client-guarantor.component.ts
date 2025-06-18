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
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    // 1) ensure clients are loaded into the store
    this.store.dispatch(loadAll({}));
    // 2) load this client’s guarantors

    this.facade.loadClientGuarantorsByClientId(this.clientIdParam);
    this.guarantors$ = this.facade.items$;

    this.clientsList$ = this.store.select(selectAllClients);

    combineLatest([this.guarantors$, this.clientsList$])
      .pipe(
        // 1) log the raw inputs
        tap(([guarantors, clientsList]) =>
          console.log(
            '⏺ combineLatest • guarantors:',
            guarantors,
            'clientsList:',
            clientsList
          )
        ),

        // 2) map in the names, no logging here
        map(([guarantors, clientsList]) =>
          guarantors.map((g) => ({
            ...g,
            guarantorName:
              clientsList.find((c) => c.id === g.guarantorId)?.name ?? '—',
            guarantorNameAR:
              clientsList.find((c) => c.id === g.guarantorId)?.nameAR ?? '—',
          }))
        ),

        // 3) log right after that mapping
        tap((mapped) => console.log('📝 after map (with names):', mapped)),

        // 4) filter out inactive
        map((mapped) => mapped.filter((g) => g.isActive)),

        // 5) log the filtered result
        tap((filtered) =>
          console.log('✅ after filter (active only):', filtered)
        ),

        // 6) sort descending by id
        map((filtered) => filtered.sort((a, b) => b.id - a.id)),

        // 7) final log
        tap((sorted) => console.log('🔢 after sort (by id desc):', sorted)),

        takeUntil(this.destroy$)
      )
      .subscribe((finalList) => {
        console.log('🎯 final output:', finalList);
        console.log('🎯 final output:', finalList);
        this.originalGuarantors = finalList;
        this.filteredGuarantors = [...finalList];
      });
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
    this.selectedGuarantorId = guarantorId;
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
    this.facade.loadAll();
    this.guarantors$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

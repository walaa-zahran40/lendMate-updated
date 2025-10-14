import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  map,
  takeUntil,
  forkJoin,
  of,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { loadOfficers } from '../../../../../../../../organizations/store/officers/officers.actions';
import { selectOfficers } from '../../../../../../../../organizations/store/officers/officers.selectors';
import { ClientOfficer } from '../../../../../../store/client-officers/client-officer.model';
import { ClientOfficersFacade } from '../../../../../../store/client-officers/client-officers.facade';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';
import { ClientOfficerType } from '../../../../../../../../lookups/store/client-officer-types/client-officer-type.model';

@Component({
  selector: 'app-view-client-officer',
  standalone: false,
  templateUrl: './view-client-officer.component.html',
  styleUrl: './view-client-officer.component.scss',
})
export class ViewClientOfficersComponent {
  tableDataInside: ClientOfficer[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'detailes', header: 'Details' },
    { field: 'detailesAR', header: 'Details AR' },
    { field: 'officer', header: 'Officer' },
    { field: 'isMain', header: 'is Main' },
  ];
  showDeleteModal: boolean = false;
  selectedOfficerId: number | null = null;
  originalOfficers: ClientOfficer[] = [];
  filteredOfficers: ClientOfficer[] = [];
  clientOfficers$!: Observable<ClientOfficer[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: ClientOfficersFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data['list'] as {
      clientId: number;
      items: ClientOfficer[];
      officers: Officer[];
      clientOfficerTypes: ClientOfficerType[];
    };

    this.clientIdParam = data.clientId;

    // 1) First render from resolver (no flicker)
    const idToOfficer = new Map(data.officers.map((o) => [o.id, o.name]));
    const idToType = new Map(
      data.clientOfficerTypes.map((t) => [t.id, t.name])
    );

    const firstRender = (data.items ?? [])
      .map((it) => ({
        ...it,
        officer: idToOfficer.get(it.officerId) ?? '—',
        clientOfficerType: idToType.get(it.clientOfficerTypeId) ?? '—',
      }))
      .filter((it) => it.isActive)
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    this.originalOfficers = firstRender;
    this.filteredOfficers = [...firstRender];

    // 2) Subscribe to store for post-CRUD refresh
    this.facade.loadByClientId(this.clientIdParam);
    this.clientOfficers$ = this.facade.items$;

    combineLatest([
      this.clientOfficers$,
      of(data.officers),
      of(data.clientOfficerTypes),
    ])
      .pipe(
        map(([items, officers, types]) => {
          const mapOfficer = new Map(officers.map((o) => [o.id, o.name]));
          const mapType = new Map(types.map((t) => [t.id, t.name]));
          return (items ?? [])
            .filter((it) => it.clientId === this.clientIdParam)
            .map((it) => ({
              ...it,
              officer: mapOfficer.get(it.officerId) ?? '—',
              clientOfficerType: mapType.get(it.clientOfficerTypeId) ?? '—',
            }))
            .filter((it) => it.isActive)
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalOfficers = enriched;
        this.filteredOfficers = [...enriched];
      });
  }

  onAddOfficer() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-officers'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteOfficer(clientOfficerId: any): void {
    console.log(
      '[View] onDeleteOfficere() – opening modal for id=',
      clientOfficerId
    );
    this.selectedIds = [clientOfficerId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedOfficerId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredOfficers = this.originalOfficers.filter((clientOfficer) =>
      Object.values(clientOfficer).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditOfficer(clientOfficer: ClientOfficer) {
    this.router.navigate(
      ['/crm/clients/edit-client-officers', clientOfficer.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewOfficer(ct: ClientOfficer) {
    this.router.navigate(['/crm/clients/edit-client-officers', ct.id], {
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
    this.clientOfficers$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

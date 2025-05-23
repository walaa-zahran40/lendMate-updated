import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { loadOfficers } from '../../../../../../../../organizations/store/officers/officers.actions';
import { selectOfficers } from '../../../../../../../../organizations/store/officers/officers.selectors';
import { ClientOfficer } from '../../../../../../store/client-officers/client-officer.model';
import { ClientOfficersFacade } from '../../../../../../store/client-officers/client-officers.facade';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';

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
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientOfficersByClientId(this.clientIdParam);
    this.clientOfficers$ = this.facade.items$;

    this.store.dispatch(loadOfficers());

    this.officersList$ = this.store.select(selectOfficers);

    combineLatest([
      this.clientOfficers$,
      this.officersList$,
    ])
      .pipe(
        map(([clientOfficers, officersList]) =>
          clientOfficers
            .map((clientOfficer) => ({
              ...clientOfficer,
              officer:
                officersList.find((c) => c.id === clientOfficer.officerId)?.name ||
                '—',
            }))
            .filter((clientOfficer) => clientOfficer.isActive)
            .sort((a, b) => b.id - a.id)
        ),
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
    this.selectedOfficerId = clientOfficerId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedOfficerId
    );
    if (this.selectedOfficerId !== null) {
      this.facade.delete(this.selectedOfficerId, this.clientIdParam);
      console.log('[View] confirmDelete() – facade.delete() called');
    } else {
      console.warn('[View] confirmDelete() – no id to delete');
    }
    this.resetDeleteModal();
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
}

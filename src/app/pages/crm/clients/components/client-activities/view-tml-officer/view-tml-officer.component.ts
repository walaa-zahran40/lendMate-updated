import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, combineLatest } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { ClientTMLOfficer } from '../../../store/client-tml-officers/client-tml-officer.model';
import { ClientTMLOfficersFacade } from '../../../store/client-tml-officers/client-tml-officers.facade';
import { Store } from '@ngrx/store';
import { Officer } from '../../../../../organizations/store/officers/officer.model';
import { loadOfficers } from '../../../../../organizations/store/officers/officers.actions';
import { TmlOfficerType } from '../../../../../lookups/store/tml-officer-types/tml-officer-type.model';
import { loadAll as loadAllTMLOfficerTypes } from '../../../../../lookups/store/tml-officer-types/tml-officer-types.actions';
import { selectOfficers } from '../../../../../organizations/store/officers/officers.selectors';
import { selectAllTmlOfficerTypes } from '../../../../../lookups/store/tml-officer-types/tml-officer-types.selectors';

@Component({
  selector: 'app-view-tml-officer',
  standalone: false,
  templateUrl: './view-tml-officer.component.html',
  styleUrl: './view-tml-officer.component.scss',
})
export class ViewTMLOfficersComponent {
  tableDataInside: ClientTMLOfficer[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'officer', header: 'Officer' },
    { field: 'tmlOfficerType', header: 'TML Officer Type' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedTMLOfficerId: number | null = null;
  originalTMLOfficers: ClientTMLOfficer[] = [];
  filteredTMLOfficers: ClientTMLOfficer[] = [];
  tmlOfficers$!: Observable<ClientTMLOfficer[]>;
  officersList$!: Observable<Officer[]>;
  tmlOfficerTypesList$!: Observable<TmlOfficerType[]>;

  constructor(
    private router: Router,
    private facade: ClientTMLOfficersFacade,
    private route: ActivatedRoute,
    private store: Store
    
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientTMLOfficersByClientId(this.clientIdParam);
    this.tmlOfficers$ = this.facade.items$;

    this.store.dispatch(loadOfficers());
    this.store.dispatch(loadAllTMLOfficerTypes({}));
   
    this.officersList$ = this.store.select(selectOfficers);
    this.tmlOfficerTypesList$ = this.store.select(selectAllTmlOfficerTypes);

    combineLatest([this.tmlOfficers$, this.officersList$, this.tmlOfficerTypesList$])
          .pipe(
            map(([tmlOfficers, officersList, tmlOfficerTypesList]) =>
              tmlOfficers
                .map((tmlOfficer) => ({
                  ...tmlOfficer,
                  officer:
                    officersList.find((c) => c.id === tmlOfficer.officerId)?.name || '—',
                  tmlOfficerType:
                    tmlOfficerTypesList.find((c) => c.id === tmlOfficer.tmlOfficerTypeId)?.name || '—',
                }))
                .filter((tmlOfficer) => tmlOfficer.isActive)
                .sort((a, b) => b.id - a.id)
            ),
            takeUntil(this.destroy$)
          )
          .subscribe((enriched) => {
            this.originalTMLOfficers = enriched;
            this.filteredTMLOfficers = [...enriched];
          });
  }

  onAddTMLOfficer() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-tml-officers'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteTMLOfficer(tmlOfficerId: any): void {
    console.log(
      '[View] onDeleteTMLOfficere() – opening modal for id=',
      tmlOfficerId
    );
    this.selectedTMLOfficerId = tmlOfficerId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedTMLOfficerId
    );
    if (this.selectedTMLOfficerId !== null) {
      this.facade.delete(this.selectedTMLOfficerId, this.clientIdParam);
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
    this.selectedTMLOfficerId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredTMLOfficers = this.originalTMLOfficers.filter(
      (tmlOfficer) =>
        Object.values(tmlOfficer).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditTMLOfficer(tmlOfficer: ClientTMLOfficer) {
    this.router.navigate(
      ['/crm/clients/edit-client-tml-officers', tmlOfficer.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewTMLOfficer(ct: ClientTMLOfficer) {
    this.router.navigate(['/crm/clients/edit-client-tml-officers', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
}
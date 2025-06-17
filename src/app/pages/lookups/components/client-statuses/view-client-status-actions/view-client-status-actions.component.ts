import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, combineLatest, map } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientStatus } from '../../../store/client-statuses/client-status.model';
import { Store } from '@ngrx/store';
import { loadClientStatuses } from '../../../store/client-statuses/client-statuses.actions';
import { selectClientStatuses } from '../../../store/client-statuses/client-statuses.selectors';
import { ClientStatusAction } from '../../../store/client-statuses-actions/client-status-action.model';
import { ClientStatusActionsFacade } from '../../../store/client-statuses-actions/client-status-actions.facade';
import { loadClientStatusActionHistory } from '../../../store/client-statuses-actions/client-status-actions.actions';

@Component({
  selector: 'app-view-client-status-actions',
  standalone: false,
  templateUrl: './view-client-status-actions.component.html',
  styleUrl: './view-client-status-actions.component.scss',
})
export class ViewClientStatusActionsComponent {
  tableDataInside: ClientStatusAction[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'statusInName', header: 'Status In' },
    { field: 'statusOutName', header: 'Status Out' },
  ];
  showDeleteModal: boolean = false;
  selectedClientStatusActionId: number | null = null;
  originalClientStatusActions: ClientStatusAction[] = [];
  filteredClientStatusActions: ClientStatusAction[] = [];
  clientStatusActions$!: Observable<ClientStatusAction[]>;
  statusList$!: Observable<ClientStatus[]>;

  constructor(
    private router: Router,
    private facade: ClientStatusActionsFacade,
    private store: Store,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('rio', this.route.snapshot);
    this.facade.loadHistory();
    this.clientStatusActions$ = this.facade.history$;
    this.facade.history$.subscribe((data) => {
      console.log('📡 Facade history$ emitted:', data);
    });
    this.store.dispatch(loadClientStatusActionHistory());
    this.statusList$ = this.store.select(selectClientStatuses);

    combineLatest([this.clientStatusActions$, this.statusList$])
      .pipe(
        takeUntil(this.destroy$),
        map(([clientStatusActions, statusList]) => {
          console.log(
            '📥 clientStatusActions from facade:',
            clientStatusActions
          );
          console.log('📥 statusList from store:', statusList);

          return clientStatusActions
            .filter((a) => {
              console.log(
                '🔎 Filtering by isActive – a.id:',
                a.id,
                '| isActive:',
                a.isActive
              );
              return a.isActive;
            })
            .map((a) => {
              console.log(
                '🧩 Mapping ClientStatusAction – id:',
                a.id,
                '| statusInId:',
                a.statusInId,
                '| statusOutId:',
                a.statusOutId
              );

              const statusInMatch = statusList.find((g) => {
                console.log(
                  '🔎 [statusIn] Checking g.id:',
                  g.id,
                  '| looking for:',
                  a.statusInId
                );
                return g.id === a.statusInId;
              });
              console.log('✅ [statusIn] Match found:', statusInMatch);

              const statusOutMatch = statusList.find((g) => {
                console.log(
                  '🔎 [statusOut] Checking g.id:',
                  g.id,
                  '| looking for:',
                  a.statusOutId
                );
                return g.id === a.statusOutId;
              });
              console.log('✅ [statusOut] Match found:', statusOutMatch);

              return {
                ...a,
                statusInName: statusInMatch?.name || '—',
                statusOutName: statusOutMatch?.name || '—',
              };
            })
            .sort((a, b) => b.id - a.id);
        })
      )

      .subscribe((normalized) => {
        console.log('✅ Normalized Client Status Actions:', normalized);

        this.originalClientStatusActions = normalized;
        this.filteredClientStatusActions = [...normalized];
      });
  }

  onAddClientStatusAction() {
    console.log('🔍 [Component] onAddClientStatusAction');
    this.router.navigate(['/lookups/add-client-status-actions']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteClientStatusActionId(clientStatusActionId: any): void {
    console.log(
      '[View] onDeleteClientStatusAction() – opening modal for id=',
      clientStatusActionId
    );
    this.selectedClientStatusActionId = clientStatusActionId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedClientStatusActionId
    );
    if (this.selectedClientStatusActionId !== null) {
      this.facade.delete(this.selectedClientStatusActionId);
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
    this.selectedClientStatusActionId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredClientStatusActions = this.originalClientStatusActions.filter(
      (clientStatusAction) =>
        Object.values(clientStatusAction).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditClientStatusAction(clientStatusAction: ClientStatusAction) {
    this.router.navigate(
      ['/lookups/edit-client-status-actions', clientStatusAction.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewClientStatusAction(ct: ClientStatusAction) {
    this.router.navigate(['/lookups/edit-client-status-actions', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
  onAddSide(clientStatusActionId: any) {
    this.router.navigate([
      '/lookups/wizard-client-status-action',
      clientStatusActionId,
    ]);
  }
}

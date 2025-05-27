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
    { field: 'statusOutName', header: 'Sstatus Out' },
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
    this.facade.loadAll();
    this.clientStatusActions$ = this.facade.all$;
    this.store.dispatch(loadClientStatuses());
    this.statusList$ = this.store.select(selectClientStatuses);

    combineLatest([this.clientStatusActions$, this.statusList$])
      .pipe(
        takeUntil(this.destroy$),
        map(([clientStatusActions, statusList]) =>
          clientStatusActions
            .filter((a) => a.isActive)
            .map((a) => ({
              ...a,
              statusInName:
                statusList.find((g) => g.id === a.statusInId)?.name || '—',
              statusOutName:
                statusList.find((g) => g.id === a.statusOutId)?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        )
      )
      .subscribe((normalized) => {
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
    this.router.navigate(['/lookups/wizard-client-status-action', clientStatusActionId]);
  }
}

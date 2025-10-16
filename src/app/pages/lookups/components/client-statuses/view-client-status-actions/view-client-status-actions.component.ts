import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  takeUntil,
  combineLatest,
  map,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientStatus } from '../../../store/client-statuses/client-status.model';
import { Store } from '@ngrx/store';
import { selectClientStatuses } from '../../../store/client-statuses/client-statuses.selectors';
import { ClientStatusAction } from '../../../store/client-statuses-actions/client-status-action.model';
import { ClientStatusActionsFacade } from '../../../store/client-statuses-actions/client-status-actions.facade';
import { loadClientStatusActionHistory } from '../../../store/client-statuses-actions/client-status-actions.actions';
import { ClientStatusesFacade } from '../../../store/client-statuses/client-statuses.facade';

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
    private clientStatuesFacade: ClientStatusesFacade,
    private store: Store,
    private route: ActivatedRoute
  ) {}
ngOnInit() {
  this.facade.loadHistory();
  this.store.dispatch(loadClientStatusActionHistory());

  this.clientStatusActions$ = this.facade.history$;

  this.clientStatuesFacade.loadHistory();
  this.statusList$ =  this.clientStatuesFacade.history$;

  combineLatest([this.clientStatusActions$, this.statusList$])
    .pipe(
      takeUntil(this.destroy$),
      map(([clientStatusActions, statusList]) =>
        clientStatusActions
          .filter((a) => a.isActive)
          .map((a) => {
            const statusIn = statusList.find((s) => s.id === a.statusInId);
            const statusOut = statusList.find((s) => s.id === a.statusOutId);

            return {
              ...a,
              statusInName: statusIn?.name ?? '—',
              statusOutName: statusOut?.name ?? '—',
            };
          })
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
    this.selectedIds = [clientStatusActionId];
    this.showDeleteModal = true;
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
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

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
    this.clientStatusActions$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

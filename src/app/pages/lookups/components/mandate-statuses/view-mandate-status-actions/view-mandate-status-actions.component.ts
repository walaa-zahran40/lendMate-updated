import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, combineLatest, map } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { MandateStatus } from '../../../store/mandate-statuses/mandate-statuses/mandate-status.model';
import { Store } from '@ngrx/store';
import { loadMandateStatuses } from '../../../store/mandate-statuses/mandate-statuses/mandate-statuses.actions';
import { MandateStatusAction } from '../../../store/mandate-statuses/mandate-statuses-actions/mandate-status-action.model';
import { MandateStatusActionsFacade } from '../../../store/mandate-statuses/mandate-statuses-actions/mandate-status-actions.facade';
import { selectMandateStatuses } from '../../../store/mandate-statuses/mandate-statuses/mandate-statuses.selectors';

@Component({
  selector: 'app-view-mandate-status-actions',
  standalone: false,
  templateUrl: './view-mandate-status-actions.component.html',
  styleUrl: './view-mandate-status-actions.component.scss',
})
export class ViewMandateStatusActionsComponent {
  tableDataInside: MandateStatusAction[] = [];
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
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedMandateStatusActionId: number | null = null;
  originalMandateStatusActions: MandateStatusAction[] = [];
  filteredMandateStatusActions: MandateStatusAction[] = [];
  mandateStatusActions$!: Observable<MandateStatusAction[]>;
  // statusList$!: Observable<MandateStatus[]>;

  constructor(
    private router: Router,
    private facade: MandateStatusActionsFacade,
    private store: Store,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('rio', this.route.snapshot);
    this.facade.loadHistory();
    this.mandateStatusActions$ = this.facade.history$;

    this.mandateStatusActions$
      .pipe(
        takeUntil(this.destroy$),
        map((mandateStatusActions) =>
          mandateStatusActions
            // .filter((a) => a.isActive)
            .map((a) => ({
              ...a,
              statusInName: a.statusIn?.name || '—',
              statusOutName: a.statusOut?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        )
      )
      .subscribe((normalized) => {
        this.originalMandateStatusActions = normalized;
        this.filteredMandateStatusActions = [...normalized];
      });
  }

  onAddMandateStatusAction() {
    console.log('🔍 [Component] onAddMandateStatusAction');
    this.router.navigate(['/lookups/add-mandate-status-actions']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMandateStatusActionId(mandateStatusActionId: any): void {
    console.log(
      '[View] onDeleteMandateStatusAction() – opening modal for id=',
      mandateStatusActionId
    );
    this.selectedMandateStatusActionId = mandateStatusActionId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedMandateStatusActionId
    );
    if (this.selectedMandateStatusActionId !== null) {
      this.facade.delete(this.selectedMandateStatusActionId);
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
    this.selectedMandateStatusActionId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateStatusActions =
      this.originalMandateStatusActions.filter((mandateStatusAction) =>
        Object.values(mandateStatusAction).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMandateStatusAction(mandateStatusAction: MandateStatusAction) {
    this.router.navigate(
      ['/lookups/edit-mandate-status-actions', mandateStatusAction.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewMandateStatusAction(ct: MandateStatusAction) {
    this.router.navigate(['/lookups/edit-mandate-status-actions', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
  onAddSide(mandateStatusActionId: any) {
    this.router.navigate([
      '/lookups/wizard-mandate-status-action',
      mandateStatusActionId,
    ]);
  }
}

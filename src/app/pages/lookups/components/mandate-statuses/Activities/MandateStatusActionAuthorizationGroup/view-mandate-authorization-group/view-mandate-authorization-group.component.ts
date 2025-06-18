import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  map,
  takeUntil,
  take,
  filter,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { AuthorizationGroup } from '../../../../../store/authorization-groups/authorization-group.model';
import { MandateActionAuthorizationGroup } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-group.model';
import { MandateActionAuthorizationGroupsFacade } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.facade';
import { selectAllAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.selectors';
import { loadAll as loadAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.actions';
import { loadMandateActionAuthorizationGroupHistory } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.actions';
import { selectActionAuthorizationGroupHistory } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.selectors';

@Component({
  selector: 'app-view-mandate-authorizationg-group',
  standalone: false,
  templateUrl: './view-mandate-authorization-group.component.html',
  styleUrl: './view-mandate-authorization-group.component.scss',
})
export class ViewMandateActionAuthorizationGroupsComponent {
  tableDataInside: MandateActionAuthorizationGroup[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  mandateStatusActionIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'authorizationGroup', header: 'AuthorizationGroup' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedActionAuthorizationGroupId: number | null = null;
  originalActionAuthorizationGroups: MandateActionAuthorizationGroup[] = [];
  filteredActionAuthorizationGroups: MandateActionAuthorizationGroup[] = [];
  actionAuthorizationGroups$!: Observable<MandateActionAuthorizationGroup[]>;
  authorizationGroupsList$!: Observable<any[]>;

  constructor(
    private router: Router,
    private facade: MandateActionAuthorizationGroupsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('mandateStatusActionId');
    this.mandateStatusActionIdParam = raw !== null ? Number(raw) : undefined;
    this.store.dispatch(loadMandateActionAuthorizationGroupHistory());
    this.authorizationGroupsList$ = this.store.select(
      selectActionAuthorizationGroupHistory
    );

    this.facade.loadMandateActionAuthorizationGroupsByMandateStatusActionId(
      this.mandateStatusActionIdParam
    );
    this.actionAuthorizationGroups$ = this.facade.history$;

    combineLatest([
      this.actionAuthorizationGroups$,
      this.authorizationGroupsList$,
    ])
      .pipe(
        map(([actionAuthorizationGroups, authorizationGroupsList]) =>
          actionAuthorizationGroups
            .map((actionAuthorizationGroup) => ({
              ...actionAuthorizationGroup,
              authorizationGroup: authorizationGroupsList.find(
                (c) => c.id === actionAuthorizationGroup.authorizationGroupId
              )?.name,
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalActionAuthorizationGroups = enriched;
        this.filteredActionAuthorizationGroups = [...enriched];
      });
  }

  onAddActionAuthorizationGroup() {
    const mandateStatusActionIdParam = this.route.snapshot.paramMap.get(
      'mandateStatusActionId'
    );

    this.router.navigate(['/lookups/add-mandate-action-authorizationGroups'], {
      queryParams: {
        mode: 'add',
        mandateStatusActionId: mandateStatusActionIdParam,
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteActionAuthorizationGroup(actionAuthorizationGroupId: any): void {
    console.log(
      '[View] onDeleteActionAuthorizationGroup() – opening modal for id=',
      actionAuthorizationGroupId
    );
    this.selectedActionAuthorizationGroupId = actionAuthorizationGroupId;
    this.showDeleteModal = true;
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.mandateStatusActionIdParam)
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
    this.actionAuthorizationGroups$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedActionAuthorizationGroupId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredActionAuthorizationGroups =
      this.originalActionAuthorizationGroups.filter(
        (actionAuthorizationGroup) =>
          Object.values(actionAuthorizationGroup).some((val) =>
            val?.toString().toLowerCase().includes(lower)
          )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditActionAuthorizationGroup(
    actionAuthorizationGroup: MandateActionAuthorizationGroup
  ) {
    this.router.navigate(
      [
        '/lookups/edit-mandate-action-authorizationGroups',
        actionAuthorizationGroup.id,
      ],
      {
        queryParams: {
          mode: 'edit',
          mandateStatusActionId: this.mandateStatusActionIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewActionAuthorizationGroup(ct: MandateActionAuthorizationGroup) {
    this.router.navigate(
      ['/lookups/edit-mandate-action-authorizationGroups', ct.id],
      {
        queryParams: {
          mode: 'view',
          mandateStatusActionId: this.mandateStatusActionIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
}

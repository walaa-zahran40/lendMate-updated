import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil, take, filter } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { AuthorizationGroup } from '../../../../../store/authorization-groups/authorization-groups.model';
import { ActionAuthorizationGroup } from '../../../../../store/client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-group.model';
import { ActionAuthorizationGroupsFacade } from '../../../../../store/client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-groups.facade';
import { selectAllAuthorizationGroups } from '../../../../../store/authorization-groups/authorization-groups.selectors';
import { loadAll as loadAuthorizationGroups} from '../../../../../store/authorization-groups/authorization-groups.actions';

@Component({
  selector: 'app-view-action-authorizationg-group',
  standalone: false,
  templateUrl: './view-action-authorization-group.component.html',
  styleUrl: './view-action-authorization-group.component.scss',
})
export class ViewActionAuthorizationGroupsComponent {
  tableDataInside: ActionAuthorizationGroup[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientStatusActionIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'authorizationGroup', header: 'AuthorizationGroup' },
    { field: 'startDate', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedActionAuthorizationGroupId: number | null = null;
  originalActionAuthorizationGroups: ActionAuthorizationGroup[] = [];
  filteredActionAuthorizationGroups: ActionAuthorizationGroup[] = [];
  actionAuthorizationGroups$!: Observable<ActionAuthorizationGroup[]>;
  authorizationGroupsList$!: Observable<AuthorizationGroup[]>;

  constructor(
    private router: Router,
    private facade: ActionAuthorizationGroupsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientStatusActionId');
    this.clientStatusActionIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadActionAuthorizationGroupsByClientStatusActionId(this.clientStatusActionIdParam);
    this.store.dispatch(loadAuthorizationGroups({}));

    this.actionAuthorizationGroups$ = this.facade.items$;
    this.authorizationGroupsList$ = this.store.select(selectAllAuthorizationGroups);

    this.actionAuthorizationGroups$.pipe(take(1)).subscribe(data => console.log('actionAuthorizationGroups$', data));
    this.authorizationGroupsList$.pipe(take(1)).subscribe(data => console.log('authorizationGroupsList$', data));

     this.setupAuthorizationGroupMapping();
  }
  private setupAuthorizationGroupMapping(): void {
    combineLatest([
      this.actionAuthorizationGroups$,
      this.authorizationGroupsList$,
    ])
      .pipe(
        filter(([actionGroups, groupList]) => actionGroups.length > 0 && groupList.length > 0),
        map(([actionAuthorizationGroups, authorizationGroupsList]) =>
          actionAuthorizationGroups
            .map((actionAuthorizationGroup) => ({
              ...actionAuthorizationGroup,
              authorizationGroup:
                authorizationGroupsList.find((c) => c.id === actionAuthorizationGroup.authorizationGroupId)?.name || '—',
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
    const clientStatusActionIdParam = this.route.snapshot.paramMap.get('clientStatusActionId');

    this.router.navigate(['/lookups/add-action-authorizationGroups'], {
      queryParams: { mode: 'add', clientStatusActionId: clientStatusActionIdParam },
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

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedActionAuthorizationGroupId
    );
    if (this.selectedActionAuthorizationGroupId !== null) {
      this.facade.delete(this.selectedActionAuthorizationGroupId, this.clientStatusActionIdParam);
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
    this.selectedActionAuthorizationGroupId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredActionAuthorizationGroups = this.originalActionAuthorizationGroups.filter((actionAuthorizationGroup) =>
      Object.values(actionAuthorizationGroup).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditActionAuthorizationGroup(actionAuthorizationGroup: ActionAuthorizationGroup) {
    this.router.navigate(
      ['/lookups/edit-action-authorizationGroups', actionAuthorizationGroup.id],
      {
        queryParams: {
          mode: 'edit',
          clientStatusActionId: this.clientStatusActionIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewActionAuthorizationGroup(ct: ActionAuthorizationGroup) {
    this.router.navigate(['/lookups/edit-action-authorizationGroups', ct.id], {
      queryParams: {
        mode: 'view',
        clientStatusActionId: this.clientStatusActionIdParam, // <-- use "currencyId" here
      },
    });
  }
}

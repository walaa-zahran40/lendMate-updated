import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, combineLatest, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { NotificationGroup } from '../../../../../store/notification-groups/notification-groups.model';
import { selectAllNotificationGroups } from '../../../../../store/notification-groups/notification-groups.selectors';
import { loadAll as loadNotificationGroups} from '../../../../../store/notification-groups/notification-groups.actions';
import { ActionNotificationGroup } from '../../../../../store/client-statuses-actions-activities/ClientStatusActionNotificationGroup/action-notification-group.model';
import { ActionNotificationGroupsFacade } from '../../../../../store/client-statuses-actions-activities/ClientStatusActionNotificationGroup/action-notification-groups.facade';

@Component({
  selector: 'app-view-action-notificationg-group',
  standalone: false,
  templateUrl: './view-action-notification-group.component.html',
  styleUrl: './view-action-notification-group.component.scss',
})
export class ViewActionNotificationGroupsComponent {
  tableDataInside: ActionNotificationGroup[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientStatusActionIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'notificationGroup', header: 'NotificationGroup' },
    { field: 'startDate', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedActionNotificationGroupId: number | null = null;
  originalActionNotificationGroups: ActionNotificationGroup[] = [];
  filteredActionNotificationGroups: ActionNotificationGroup[] = [];
  actionNotificationGroups$!: Observable<ActionNotificationGroup[]>;
  notificationGroupsList$!: Observable<NotificationGroup[]>;

  constructor(
    private router: Router,
    private facade: ActionNotificationGroupsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientStatusActionId');
    this.clientStatusActionIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadActionNotificationGroupsByClientStatusActionId(this.clientStatusActionIdParam);
    this.actionNotificationGroups$ = this.facade.items$;

    this.store.dispatch(loadNotificationGroups({}));

    this.notificationGroupsList$ = this.store.select(selectAllNotificationGroups);

    combineLatest([
      this.actionNotificationGroups$,
      this.notificationGroupsList$,
    ])
      .pipe(
        map(([actionNotificationGroups, notificationGroupsList]) =>
          actionNotificationGroups
            .map((actionNotificationGroup) => ({
              ...actionNotificationGroup,
              notificationGroup:
                notificationGroupsList.find((c) => c.id === actionNotificationGroup.notificationGroupId)?.name ||
                '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalActionNotificationGroups = enriched;
        this.filteredActionNotificationGroups = [...enriched];
      });
  }

  onAddActionNotificationGroup() {
    const clientStatusActionIdParam = this.route.snapshot.paramMap.get('clientStatusActionId');

    this.router.navigate(['/lookups/add-action-notificationGroups'], {
      queryParams: { mode: 'add', clientStatusActionId: clientStatusActionIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteActionNotificationGroup(actionNotificationGroupId: any): void {
    console.log(
      '[View] onDeleteActionNotificationGroup() – opening modal for id=',
      actionNotificationGroupId
    );
    this.selectedActionNotificationGroupId = actionNotificationGroupId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedActionNotificationGroupId
    );
    if (this.selectedActionNotificationGroupId !== null) {
      this.facade.delete(this.selectedActionNotificationGroupId, this.clientStatusActionIdParam);
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
    this.selectedActionNotificationGroupId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredActionNotificationGroups = this.originalActionNotificationGroups.filter((actionNotificationGroup) =>
      Object.values(actionNotificationGroup).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditActionNotificationGroup(actionNotificationGroup: ActionNotificationGroup) {
    this.router.navigate(
      ['/lookups/edit-action-notificationGroups', actionNotificationGroup.id],
      {
        queryParams: {
          mode: 'edit',
          clientStatusActionId: this.clientStatusActionIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewActionNotificationGroup(ct: ActionNotificationGroup) {
    this.router.navigate(['/lookups/edit-action-notificationGroups', ct.id], {
      queryParams: {
        mode: 'view',
        clientStatusActionId: this.clientStatusActionIdParam, // <-- use "currencyId" here
      },
    });
  }
}

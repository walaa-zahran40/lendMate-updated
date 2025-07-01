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
} from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { NotificationGroup } from '../../../../../store/notification-groups/notification-group.model';
import { selectAllNotificationGroups } from '../../../../../store/notification-groups/notification-groups.selectors';
import { loadNotificationGroupHistory, loadAll as loadNotificationGroups } from '../../../../../store/notification-groups/notification-groups.actions';
import { MandateActionNotificationGroup } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-group.model';
import { MandateActionNotificationGroupsFacade } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-groups.facade';
import { loadMandateActionNotificationGroupHistory } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionNotificationGroup/action-notification-groups.actions';
import { selectActionAuthorizationGroupHistory } from '../../../../../store/mandate-statuses-actions-activities/MandateStatusActionAuthorizationGroup/action-authorization-groups.selectors';
import { NotificationGroupsFacade } from '../../../../../store/notification-groups/notification-groups.facade';

@Component({
  selector: 'app-view-mandate-notificationg-group',
  standalone: false,
  templateUrl: './view-mandate-notification-group.component.html',
  styleUrl: './view-mandate-notification-group.component.scss',
})
export class ViewMandateActionNotificationGroupsComponent {
  tableDataInside: MandateActionNotificationGroup[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  mandateStatusActionIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'notificationGroup', header: 'Notification Group' },
    { field: 'startDate', header: 'Start Date' },
    // { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedActionNotificationGroupId: number | null = null;
  originalActionNotificationGroups: MandateActionNotificationGroup[] = [];
  filteredActionNotificationGroups: MandateActionNotificationGroup[] = [];
  actionNotificationGroups$!: Observable<MandateActionNotificationGroup[]>;
  notificationGroupsList$!: Observable<any[]>;

  constructor(
    private router: Router,
    private facade: MandateActionNotificationGroupsFacade,
    private NotificationGroupFacade: NotificationGroupsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('mandateStatusActionId');
    this.mandateStatusActionIdParam = raw !== null ? Number(raw) : undefined;

    this.NotificationGroupFacade.loadAll(); 
    this.notificationGroupsList$ = this.NotificationGroupFacade.all$; 

    this.facade.loadActionNotificationGroupsByMandateStatusActionId(this.mandateStatusActionIdParam);
    this.actionNotificationGroups$ = this.facade.items$;

    combineLatest([
      this.actionNotificationGroups$,
      this.notificationGroupsList$,
    ])
      .pipe(
        map(([actionNotificationGroups, notificationGroupsList]) =>
          actionNotificationGroups
            .map((actionNotificationGroup) => ({
              ...actionNotificationGroup,
              notificationGroup: notificationGroupsList.find(
                (c) => c.id === actionNotificationGroup.notificationGroupId
              )?.name,
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
    const mandateStatusActionIdParam = this.route.snapshot.paramMap.get(
      'mandateStatusActionId'
    );

    this.router.navigate(['/lookups/add-mandate-action-notificationGroups'], {
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
  onDeleteActionNotificationGroup(actionNotificationGroupId: any): void {
    console.log(
      '[View] onDeleteActionNotificationGroup() – opening modal for id=',
      actionNotificationGroupId
    );
    this.selectedIds = [actionNotificationGroupId];
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
    this.actionNotificationGroups$ = this.facade.items$;
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
    this.selectedActionNotificationGroupId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredActionNotificationGroups =
      this.originalActionNotificationGroups.filter((actionNotificationGroup) =>
        Object.values(actionNotificationGroup).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditActionNotificationGroup(
    actionNotificationGroup: MandateActionNotificationGroup
  ) {
    this.router.navigate(
      [
        '/lookups/edit-mandate-action-notificationGroups',
        actionNotificationGroup.id,
      ],
      {
        queryParams: {
          mode: 'edit',
          mandateStatusActionId: this.mandateStatusActionIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewActionNotificationGroup(ct: MandateActionNotificationGroup) {
    this.router.navigate(
      ['/lookups/edit-mandate-action-notificationGroups', ct.id],
      {
        queryParams: {
          mode: 'view',
          mandateStatusActionId: this.mandateStatusActionIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
}

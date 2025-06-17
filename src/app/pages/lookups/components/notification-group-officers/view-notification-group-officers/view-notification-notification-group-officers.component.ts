import { Component, ViewChild } from '@angular/core';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { NotificationGroupOfficer } from '../../../store/notification-group-officers/notification-group-officer.model';
import { NotificationGroupOfficersFacade } from '../../../store/notification-group-officers/notification-group-officers.facade';
import { NotificationGroupsFacade } from '../../../store/notification-groups/notification-groups.facade';
import { OfficersFacade } from '../../../../organizations/store/officers/officers.facade';

@Component({
  selector: 'app-view-notification-group-officers',
  standalone: false,
  templateUrl: './view-notification-group-officers.component.html',
  styleUrl: './view-notification-group-officers.component.scss',
})
export class ViewNotificationGroupOfficersComponent {
  tableDataInside: NotificationGroupOfficer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'notificationGroupName', header: 'notification Group' },
    { field: 'officerName', header: 'officer' },
    { field: 'startDate', header: 'start Date' },
    { field: 'isCurrent', header: 'isCurrent' },
    { field: 'isActive', header: 'isActive' },
  ];

  showDeleteModal = false;
  selectedNotificationGroupOfficerId: number | null = null;
  originalNotificationGroupOfficers: NotificationGroupOfficer[] = [];
  filteredNotificationGroupOfficers: NotificationGroupOfficer[] = [];
  notificationGroupOfficers$!: any;
  notificationGroupList$: any;
  officersList$: any;
  constructor(
    private router: Router,
    private facade: NotificationGroupOfficersFacade,
    private notificationGroupsFacade: NotificationGroupsFacade,
    private officersFacade: OfficersFacade
  ) {}

  ngOnInit() {
    this.notificationGroupOfficers$ = this.facade.history$;
    this.facade.loadHistory();

    this.notificationGroupList$ = this.notificationGroupsFacade.all$;
    this.notificationGroupsFacade.loadAll();

    this.officersList$ = this.officersFacade.items$;
    this.officersFacade.loadAll();

    // Combine fee types with their corresponding calculation type names
    combineLatest<[NotificationGroupOfficer[], any[], any[]]>([
      this.notificationGroupOfficers$ ?? of([]),
      this.notificationGroupList$ ?? of([]),
      this.officersList$ ?? of([]),
    ])
      .pipe(
        map(([notificationGroupOfficers, feeCalcTypes, officers]) => {
          console.log('📦 Raw notificationGroups:', notificationGroupOfficers);
          console.log('📦 Raw feeCalcTypes:', feeCalcTypes);
          console.log('📦 Raw officers:', officers);

          return notificationGroupOfficers
            .map((ss) => {
              const groupMatch = feeCalcTypes.find(
                (s) => s.id === ss.notificationGroupId
              );
              const officerMatch = officers.find((o) => o.id === ss.officerId);

              return {
                ...ss,
                notificationGroupName: groupMatch?.name || '—',
                officerName: officerMatch?.name || '—',
              };
            })
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('🔄 Mapped Result:', result);
        this.filteredNotificationGroupOfficers = result;
        this.originalNotificationGroupOfficers = result;
      });
  }

  onAddNotificationGroupOfficer() {
    this.router.navigate(['/lookups/add-notification-group-officers']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteNotificationGroupOfficer(notificationGroupsId: number): void {
    this.selectedNotificationGroupOfficerId = notificationGroupsId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedNotificationGroupOfficerId !== null) {
      this.facade.delete(this.selectedNotificationGroupOfficerId);
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
    this.showDeleteModal = false;
    this.selectedNotificationGroupOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredNotificationGroupOfficers =
      this.originalNotificationGroupOfficers.filter((notificationGroups) =>
        Object.values(notificationGroups).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditNotificationGroupOfficer(notificationGroups: NotificationGroupOfficer) {
    this.router.navigate(
      ['/lookups/edit-notification-group-officers', notificationGroups.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewNotificationGroupOfficer(notificationGroups: NotificationGroupOfficer) {
    this.router.navigate(
      ['/lookups/edit-notification-group-officers', notificationGroups.id],
      {
        queryParams: { mode: 'view' },
      }
    );
  }
}

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { NotificationGroupsFacade } from '../../../store/notification-groups/notification-groups.facade';
import { NotificationGroup } from '../../../store/notification-groups/notification-groups.model';

@Component({
  selector: 'app-view-notification-groups',
  standalone: false,
  templateUrl: './view-notification-groups.component.html',
  styleUrl: './view-notification-groups.component.scss',
})
export class ViewNotificationGroupsComponent {
  tableDataInside: NotificationGroup[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];
  showDeleteModal: boolean = false;
  selectedNotificationGroupId: number | null = null;
  originalNotificationGroups: NotificationGroup[] = [];
  filteredNotificationGroups: NotificationGroup[] = [];
  notificationGroups$!: Observable<NotificationGroup[]>;

  constructor(
    private router: Router,
    private facade: NotificationGroupsFacade
  ) {}
  ngOnInit() {
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'NotificationGroup')
      )
      .subscribe(() => this.facade.loadAll());
    this.notificationGroups$ = this.facade.all$;

    this.notificationGroups$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((address) => {
        const activeCodes = address.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
        this.originalNotificationGroups = sorted;
        this.filteredNotificationGroups = [...sorted];
      });
  }

  onAddNotificationGroup() {
    this.router.navigate(['/lookups/add-notification-groups']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteNotificationGroup(notificationGroupId: any): void {
    console.log(
      '[View] onDeleteNotificationGroup() – opening modal for id=',
      notificationGroupId
    );
    this.selectedNotificationGroupId = notificationGroupId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedNotificationGroupId
    );
    if (this.selectedNotificationGroupId !== null) {
      this.facade.delete(this.selectedNotificationGroupId);
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
    this.selectedNotificationGroupId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredNotificationGroups = this.originalNotificationGroups.filter(
      (notificationGroup) =>
        Object.values(notificationGroup).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditNotificationGroup(notificationGroup: NotificationGroup) {
    this.router.navigate(
      ['/lookups/edit-notification-groups', notificationGroup.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewNotificationGroup(ct: NotificationGroup) {
    this.router.navigate(['/lookups/edit-notification-groups', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}

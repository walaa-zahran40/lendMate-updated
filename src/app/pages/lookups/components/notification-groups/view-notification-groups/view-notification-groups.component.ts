import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { NotificationGroupsFacade } from '../../../store/notification-groups/notification-groups.facade';
import { NotificationGroup } from '../../../store/notification-groups/notification-group.model';

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
    { field: 'isActive', header: 'Is Active' },
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
    this.facade.loadHistory();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'NotificationGroup')
      )
      .subscribe(() => this.facade.loadHistory());
    this.notificationGroups$ = this.facade.history$;

    this.notificationGroups$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((address) => {
        const sorted = [...address].sort((a, b) => b?.id - a?.id);
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
    this.selectedIds = [notificationGroupId];
    this.showDeleteModal = true;
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
    this.notificationGroups$ = this.facade.all$;
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

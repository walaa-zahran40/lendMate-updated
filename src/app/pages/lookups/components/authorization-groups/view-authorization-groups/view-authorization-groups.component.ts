import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AuthorizationGroupsFacade } from '../../../store/authorization-groups/authorization-groups.facade';
import { AuthorizationGroup } from '../../../store/authorization-groups/authorization-group.model';

@Component({
  selector: 'app-view-authorization-groups',
  standalone: false,
  templateUrl: './view-authorization-groups.component.html',
  styleUrl: './view-authorization-groups.component.scss',
})
export class ViewAuthorizationGroupsComponent {
  tableDataInside: AuthorizationGroup[] = [];
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
  selectedAuthorizationGroupId: number | null = null;
  originalAuthorizationGroups: AuthorizationGroup[] = [];
  filteredAuthorizationGroups: AuthorizationGroup[] = [];
  authorizationGroups$!: Observable<AuthorizationGroup[]>;

  constructor(
    private router: Router,
    private facade: AuthorizationGroupsFacade
  ) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'AuthorizationGroup')
      )
      .subscribe(() => this.facade.loadHistory());
    this.authorizationGroups$ = this.facade.history$;

    this.authorizationGroups$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((address) => {
        const sorted = [...address].sort((a, b) => b?.id - a?.id);
        this.originalAuthorizationGroups = sorted;
        this.filteredAuthorizationGroups = [...sorted];
      });
  }

  onAddAuthorizationGroup() {
    this.router.navigate(['/lookups/add-authorization-groups']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteAuthorizationGroup(authorizationGroupId: any): void {
    console.log(
      '[View] onDeleteAuthorizationGroup() – opening modal for id=',
      authorizationGroupId
    );
    this.selectedIds = [authorizationGroupId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedAuthorizationGroupId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAuthorizationGroups = this.originalAuthorizationGroups.filter(
      (authorizationGroup) =>
        Object.values(authorizationGroup).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditAuthorizationGroup(authorizationGroup: AuthorizationGroup) {
    this.router.navigate(
      ['/lookups/edit-authorization-groups', authorizationGroup.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewAuthorizationGroup(ct: AuthorizationGroup) {
    this.router.navigate(['/lookups/edit-authorization-groups', ct.id], {
      queryParams: { mode: 'view' },
    });
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
    this.authorizationGroups$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

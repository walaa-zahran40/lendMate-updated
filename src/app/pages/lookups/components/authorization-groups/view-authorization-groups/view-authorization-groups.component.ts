import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AuthorizationGroupsFacade } from '../../../store/authorization-groups/authorization-groups.facade';
import { AuthorizationGroup } from '../../../store/authorization-groups/authorization-groups.model';

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
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'AuthorizationGroup')
      )
      .subscribe(() => this.facade.loadAll());
    this.authorizationGroups$ = this.facade.all$;

    this.authorizationGroups$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((address) => {
        const activeCodes = address.filter((code) => code.isActive);
        const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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
    this.selectedAuthorizationGroupId = authorizationGroupId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedAuthorizationGroupId
    );
    if (this.selectedAuthorizationGroupId !== null) {
      this.facade.delete(this.selectedAuthorizationGroupId);
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
}

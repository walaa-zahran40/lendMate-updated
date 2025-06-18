import { Component, ViewChild } from '@angular/core';
import { combineLatest, map, of, Subject, takeUntil, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AuthorizationGroupOfficer } from '../../../store/authorization-group-officers/authorization-group-officer.model';
import { AuthorizationGroupOfficersFacade } from '../../../store/authorization-group-officers/authorization-group-officers.facade';
import { AuthorizationGroupsFacade } from '../../../store/authorization-groups/authorization-groups.facade';
import { OfficersFacade } from '../../../../organizations/store/officers/officers.facade';

@Component({
  selector: 'app-view-authorization-group-officers',
  standalone: false,
  templateUrl: './view-authorization-group-officers.component.html',
  styleUrl: './view-authorization-group-officers.component.scss',
})
export class ViewAuthorizationGroupOfficersComponent {
  tableDataInside: AuthorizationGroupOfficer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'authorizationGroupName', header: 'authorization Group' },
    { field: 'officerName', header: 'officer' },
    { field: 'startDate', header: 'start Date' },
    { field: 'isCurrent', header: 'isCurrent' },
  ];

  showDeleteModal = false;
  selectedAuthorizationGroupOfficerId: number | null = null;
  originalAuthorizationGroupOfficers: AuthorizationGroupOfficer[] = [];
  filteredAuthorizationGroupOfficers: AuthorizationGroupOfficer[] = [];
  authorizationGroupOfficers$!: any;
  authorizationGroupList$: any;
  officersList$: any;
  constructor(
    private router: Router,
    private facade: AuthorizationGroupOfficersFacade,
    private authorizationGroupsFacade: AuthorizationGroupsFacade,
    private officersFacade: OfficersFacade
  ) {}

  ngOnInit() {
    this.authorizationGroupOfficers$ = this.facade.history$;
    this.facade.loadHistory();

    this.authorizationGroupList$ = this.authorizationGroupsFacade.history$;
    this.authorizationGroupsFacade.loadHistory();

    this.officersList$ = this.officersFacade.history$;
    this.officersFacade.loadHistory();

    // Combine fee types with their corresponding calculation type names
    combineLatest<[AuthorizationGroupOfficer[], any[], any[]]>([
      this.authorizationGroupOfficers$ ?? of([]),
      this.authorizationGroupList$ ?? of([]),
      this.officersList$ ?? of([]),
    ])
      .pipe(
        map(([authorizationGroupOfficers, feeCalcTypes, officers]) => {
          console.log(
            '📦 Raw authorizationGroups:',
            authorizationGroupOfficers
          );
          console.log('📦 Raw feeCalcTypes:', feeCalcTypes);
          console.log('📦 Raw officers:', officers);

          return authorizationGroupOfficers
            .map((ss) => {
              const groupMatch = feeCalcTypes.find(
                (s) => s.id === ss.authorizationGroupId
              );
              const officerMatch = officers.find((o) => o.id === ss.officerId);

              return {
                ...ss,
                authorizationGroupName: groupMatch?.name || '—',
                officerName: officerMatch?.name || '—',
              };
            })
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('🔄 Mapped Result:', result);
        this.filteredAuthorizationGroupOfficers = result;
        this.originalAuthorizationGroupOfficers = result;
      });
  }

  onAddAuthorizationGroupOfficer() {
    this.router.navigate(['/lookups/add-authorization-group-officers']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteAuthorizationGroupOfficer(authorizationGroupsId: number): void {
    this.selectedAuthorizationGroupOfficerId = authorizationGroupsId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAuthorizationGroupOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredAuthorizationGroupOfficers =
      this.originalAuthorizationGroupOfficers.filter((authorizationGroups) =>
        Object.values(authorizationGroups).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditAuthorizationGroupOfficer(
    authorizationGroups: AuthorizationGroupOfficer
  ) {
    this.router.navigate(
      ['/lookups/edit-authorization-group-officers', authorizationGroups.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }

  onViewAuthorizationGroupOfficer(
    authorizationGroups: AuthorizationGroupOfficer
  ) {
    this.router.navigate(
      ['/lookups/edit-authorization-group-officers', authorizationGroups.id],
      {
        queryParams: { mode: 'view' },
      }
    );
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
    this.authorizationGroupOfficers$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

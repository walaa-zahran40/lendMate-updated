import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { combineLatest, filter, map, Observable, startWith, Subject, take, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { Officer } from '../../../store/officers/officer.model';
import { Store } from '@ngrx/store';
import { selectOfficers } from '../../../store/officers/officers.selectors';
import { DepartmentManager } from '../../../store/department-managers/department-manager.model';
import { DepartmentManagersFacade } from '../../../store/department-managers/department-managers.facade';

@Component({
  selector: 'app-view-department-manager',
  standalone: false,
  templateUrl: './view-department-manager.component.html',
  styleUrl: './view-department-manager.component.scss',
})
export class ViewDepartmentManagerComponent implements OnInit, OnDestroy {
  tableDataInside: DepartmentManager[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  departmentIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'managerName', header: 'Manager' },
    { field: 'startDate', header: 'Start Date' },
   { field: 'isCurrent', header: 'Is Current' },
  ];

  showDeleteModal = false;
  selectedDepartmentManagerId: number | null = null;
  originalDepartmentManagers: DepartmentManager[] = [];
  filteredDepartmentManagers: DepartmentManager[] = [];
  departmentManagers$!: Observable<DepartmentManager[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: DepartmentManagersFacade,
    private route: ActivatedRoute,
    private officersFacade: OfficersFacade,
    private store: Store
  ) {}

  ngOnInit() {
  // 1) Grab route param
  const raw = this.route.snapshot.paramMap.get('departmentId');
  this.departmentIdParam = raw !== null ? Number(raw) : undefined;
  console.log('[View] ngOnInit → departmentIdParam =', this.departmentIdParam);

  if (this.departmentIdParam == null || isNaN(this.departmentIdParam)) {
    console.error('❌ Missing or invalid departmentIdParam! Cannot load department managers.');
    return;
  }

  // 2) Select officers BEFORE dispatching loadAll (so stream exists early)
  this.officersList$ = this.store.select(selectOfficers).pipe(
    tap(officers => console.log('[Debug] officersList$ emitted →', officers)),
    startWith([]) // guarantees first emission
  );

  // 3) Load officers
  this.officersFacade.loadAll();

  // 4) Load department managers
  console.log('[View] dispatching loadDepartmentManagersByDepartmentId(', this.departmentIdParam, ')');
  this.facade.loadDepartmentManagersByDepartmentId(this.departmentIdParam);
  this.departmentManagers$ = this.facade.items$;
  
  // 5) Inspect initial values
  this.departmentManagers$.pipe(take(1)).subscribe(
    items => console.log('[Debug] items$ emitted →', items),
    err => console.error('[Debug] items$ error →', err)
  );

  // 6) Combine and enrich
  combineLatest([
  this.facade.items$.pipe(
    startWith({ items: [], totalCount: 0 }),
    tap(response => console.log('[Debug] items$ inside combineLatest →', response))
  ),
  this.officersList$.pipe(
    startWith([]),
    tap(officers => console.log('[Debug] officersList$ inside combineLatest →', officers))
  )
])
.pipe(
  map(([response, officers]) => {
    const departmentManagers = Array.isArray(response)
      ? response
      : response.items ?? [];
    const enriched = departmentManagers.map(dm => ({
      ...dm,
      managerName: officers.find(officer => officer.id === dm.officerId)?.name || '—',
    })).sort((a, b) => b.id - a.id);

    console.log('[View] enriched departmentManagers →', enriched);
    return enriched;
  }),
  takeUntil(this.destroy$)
)
.subscribe({
  next: enriched => {
    console.log('[Subscribe] setting managers →', enriched);
    this.originalDepartmentManagers = enriched;
    this.filteredDepartmentManagers = [...enriched];
  },
  error: err => {
    console.error('[Error] combineLatest failed →', err);
  }
});

}
  onAddDepartmentManager() {
    const departmentIdParam = this.route.snapshot.paramMap.get('departmentId');
    this.router.navigate(['/organizations/add-department-managers'], {
      queryParams: { mode: 'add', departmentId: departmentIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteDepartmentManager(departmentManagersId: number): void {
    console.log(
      '[View] onDeleteDepartmentManager() – opening modal for id=',
      departmentManagersId
    );
    this.selectedDepartmentManagerId = departmentManagersId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedDepartmentManagerId != null) {
      this.facade.delete(
        this.selectedDepartmentManagerId,
        this.departmentIdParam
      );
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDepartmentManagerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredDepartmentManagers =
      this.originalDepartmentManagers.filter((departmentManager) =>
        Object.values(departmentManager).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditDepartmentManager(departmentManager: DepartmentManager) {
    console.log('edioyt', this.departmentIdParam);
    this.router.navigate(
      ['/organizations/edit-department-managers', departmentManager.id],
      {
        queryParams: {
          mode: 'edit',
          departmentId: this.departmentIdParam, // <-- use "departmentId" here
        },
      }
    );
  }

  onViewDepartmentManager(departmentManager: DepartmentManager) {
    this.router.navigate(
      ['/organizations/edit-department-managers', departmentManager.id],
      {
        queryParams: {
          mode: 'view',
          departmentId: this.departmentIdParam, // <-- and here
        },
      }
    );
  }
}

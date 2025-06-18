import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchManager } from '../../../store/branches/branch-managers/branch-manager.model';
import { BranchManagersFacade } from '../../../store/branches/branch-managers/branch-managers.facade';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { Officer } from '../../../store/officers/officer.model';
import { Store } from '@ngrx/store';
import { selectOfficers } from '../../../store/officers/officers.selectors';

@Component({
  selector: 'app-view-branch-managers',
  standalone: false,
  templateUrl: './view-branch-managers.component.html',
  styleUrl: './view-branch-managers.component.scss',
})
export class ViewBranchManagersComponent implements OnInit, OnDestroy {
  tableDataInside: BranchManager[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  branchIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'managerName', header: 'Manager' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'isCurrent', header: 'Is Current' },
  ];

  showDeleteModal = false;
  selectedBranchManagerId: number | null = null;
  originalBranchManagers: BranchManager[] = [];
  filteredBranchManagers: BranchManager[] = [];
  branchManagers$!: Observable<BranchManager[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: BranchManagersFacade,
    private route: ActivatedRoute,
    private officersFacade: OfficersFacade,
    private store: Store
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('branchId');
    this.branchIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → branchIdParam =', this.branchIdParam);
    // 2) guard: if missing or NaN, error out
    if (this.branchIdParam == null || isNaN(this.branchIdParam)) {
      console.error(
        '❌ Missing or invalid branchIdParam! Cannot load exchange rates.'
      );
      return;
    }
    this.officersList$ = this.store.select(selectOfficers);
    this.officersFacade.loadAll();

    // 2) dispatch the load (CORRECT: pass the number directly)
    this.facade.loadBranchManagersByBranchId(this.branchIdParam);
    // 3) hook up the stream
    this.branchManagers$ = this.facade.items$;

    combineLatest([this.branchManagers$, this.officersList$])
      .pipe(
        map(([branchManagers, officers]) =>
          branchManagers
            .map((gov) => ({
              ...gov,
              managerName:
                officers.find((c) => c.id === gov.managerId)?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalBranchManagers = enriched;
        this.filteredBranchManagers = [...enriched];
      });
  }

  onAddBranchManager() {
    const branchIdParam = this.route.snapshot.paramMap.get('branchId');

    this.router.navigate(['/organizations/add-branch-managers'], {
      queryParams: { mode: 'add', branchId: branchIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteBranchManager(branchManagersId: number): void {
    console.log(
      '[View] onDeleteBranchManager() – opening modal for id=',
      branchManagersId
    );
    this.selectedBranchManagerId = branchManagersId;
    this.showDeleteModal = true;
  }

  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.branchIdParam)
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
    this.branchManagers$ = this.facade.items$;
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
    this.showDeleteModal = false;
    this.selectedBranchManagerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredBranchManagers = this.originalBranchManagers.filter(
      (branchManager) =>
        Object.values(branchManager).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditBranchManager(branchManager: BranchManager) {
    console.log('edioyt', this.branchIdParam);
    this.router.navigate(
      ['/organizations/edit-branch-managers', branchManager.id],
      {
        queryParams: {
          mode: 'edit',
          branchId: this.branchIdParam, // <-- use "branchId" here
        },
      }
    );
  }

  onViewBranchManager(branchManager: BranchManager) {
    this.router.navigate(
      ['/organizations/edit-branch-managers', branchManager.id],
      {
        queryParams: {
          mode: 'view',
          branchId: this.branchIdParam, // <-- and here
        },
      }
    );
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { combineLatest, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { Officer } from '../../../store/officers/officer.model';
import { Store } from '@ngrx/store';
import { selectOfficers } from '../../../store/officers/officers.selectors';
import { BranchOfficer } from '../../../store/branch-officers/branch-officer.model';
import { BranchOfficersFacade } from '../../../store/branch-officers/branch-officers.facade';


@Component({
  selector: 'app-view-branch-officers',
  standalone: false,
  templateUrl: './view-branch-officers.component.html',
  styleUrl: './view-branch-officers.component.scss',
})
export class ViewBranchOfficersComponent implements OnInit, OnDestroy {
  tableDataInside: BranchOfficer[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  branchIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'officerName', header: 'Officer' },
   { field: 'isCurrent', header: 'Is Current' },
  ];

  showDeleteModal = false;
  selectedBranchOfficerId: number | null = null;
  originalBranchOfficers: BranchOfficer[] = [];
  filteredBranchOfficers: BranchOfficer[] = [];
  branchOfficers$!: Observable<BranchOfficer[]>;
  officersList$!: Observable<Officer[]>;

  constructor(
    private router: Router,
    private facade: BranchOfficersFacade,
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
    this.facade.loadBranchOfficersByBranchId(this.branchIdParam);
    // 3) hook up the stream
    this.branchOfficers$ = this.facade.items$;

     combineLatest([this.branchOfficers$, this.officersList$])
      .pipe(
        map(([branchOfficers, officers]) =>
          branchOfficers
            .map((gov) => ({
              ...gov,
              officerName:
                officers.find((c) => c.id === gov.officerId)?.name || '—',
            }))
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalBranchOfficers = enriched;
        this.filteredBranchOfficers = [...enriched];
      });
  }

  onAddBranchOfficer() {
    const branchIdParam = this.route.snapshot.paramMap.get('branchId');

    this.router.navigate(['/organizations/add-branch-officers'], {
      queryParams: { mode: 'add', branchId: branchIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteBranchOfficer(branchOfficersId: number): void {
    console.log(
      '[View] onDeleteBranchOfficer() – opening modal for id=',
      branchOfficersId
    );
    this.selectedBranchOfficerId = branchOfficersId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedBranchOfficerId != null) {
      this.facade.delete(
        this.selectedBranchOfficerId,
        this.branchIdParam
      );
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedBranchOfficerId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredBranchOfficers =
      this.originalBranchOfficers.filter((branchOfficer) =>
        Object.values(branchOfficer).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditBranchOfficer(branchOfficer: BranchOfficer) {
    console.log('edioyt', this.branchIdParam);
    this.router.navigate(
      ['/organizations/edit-branch-officers', branchOfficer.id],
      {
        queryParams: {
          mode: 'edit',
          branchId: this.branchIdParam, // <-- use "branchId" here
        },
      }
    );
  }

  onViewBranchOfficer(branchOfficer: BranchOfficer) {
    this.router.navigate(
      ['/organizations/edit-branch-officers', branchOfficer.id],
      {
        queryParams: {
          mode: 'view',
          branchId: this.branchIdParam, // <-- and here
        },
      }
    );
  }
}
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap } from 'rxjs';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BranchesFacade } from '../../store/branches/branches.facade';
import { Branch } from '../../store/branches/branch.model';
import { selectAllBranches } from '../../store/branches/branches.selectors';

@Component({
  selector: 'app-view-branch',
  standalone: false,
  templateUrl: './view-branch.component.html',
  styleUrl: './view-branch.component.scss',
})
export class ViewBranchComponent {
  tableDataInside: Branch[] = [];
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
  selectedBranchId: number | null = null;
  originalBranches: Branch[] = [];
  filteredBranches: Branch[] = [];
  branches$!: Observable<Branch[]>;

  constructor(private router: Router, private facade: BranchesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.branches$ = this.facade.all$;

    this.branches$?.pipe(takeUntil(this.destroy$)).subscribe((branches) => {
      // branches is now CompanyType[], not any
      const sorted = [...branches].sort((a, b) => b.id - a.id);
      this.originalBranches = sorted;
      this.filteredBranches = [...sorted];
    });
  }

  onAddBranch() {
    console.log('🔍 [Component] onAddBranch');
    this.router.navigate(['/lookups/add-branch']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteBranchId(branchId: any): void {
    console.log('[View] onDeleteBranch() – opening modal for id=', branchId);
    this.selectedBranchId = branchId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedBranchId
    );
    if (this.selectedBranchId !== null) {
      this.facade.delete(this.selectedBranchId);
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
    this.selectedBranchId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredBranches = this.originalBranches.filter((branch) =>
      Object.values(branch).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditBranch(branch: Branch) {
    this.router.navigate(['/organizations/edit-branch', branch.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewBranch(ct: Branch) {
    this.router.navigate(['/organizations/edit-branch', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
  onAddSide(branchId: any) {
    this.router.navigate(['/organizations/wizard-branch', branchId]);
  }
}

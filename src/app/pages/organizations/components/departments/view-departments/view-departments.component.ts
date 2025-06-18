import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Department } from '../../../store/departments/department.model';
import { DepartmentsFacade } from '../../../store/departments/departments.facade';

@Component({
  selector: 'app-view-departments',
  standalone: false,
  templateUrl: './view-departments.component.html',
  styleUrl: './view-departments.component.scss',
})
export class ViewDepartmentsComponent {
  tableDataInside: Department[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];

  showDeleteModal = false;
  selectedDepartmentId: number | null = null;
  originalDepartments: Department[] = [];
  filteredDepartments: Department[] = [];
  departments$!: Observable<Department[]>;

  constructor(private router: Router, private facade: DepartmentsFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading departments');
    this.facade.loadAll();
    this.departments$ = this.facade.items$;

    this.departments$
      .pipe(takeUntil(this.destroy$))
      .subscribe((departments) => {
        const sorted = [...departments].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted departments:', sorted);
        this.originalDepartments = sorted;
        this.filteredDepartments = [...sorted];
      });
  }

  onAddDepartment() {
    this.router.navigate(['organizations/add-department']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteDepartment(departmentId: number): void {
    console.log(
      '[View] onDeleteDepartment() – opening modal for id=',
      departmentId
    );
    this.selectedIds = [departmentId];
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
    this.departments$ = this.facade.items$;
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
    this.selectedDepartmentId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredDepartments = this.originalDepartments.filter((department) =>
      Object.values(department).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditDepartment(department: Department) {
    this.router.navigate(['/organizations/edit-department', department.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewDepartment(department: Department) {
    this.router.navigate(['/organizations/edit-department', department.id], {
      queryParams: { mode: 'view' },
    });
  }
  onAddSide(departmentId: any) {
    this.router.navigate(['/organizations/wizard-department', departmentId]);
  }
}

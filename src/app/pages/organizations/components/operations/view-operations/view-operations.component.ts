import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, filter, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Operation } from '../../../store/operations/operation.model';
import { OperationsFacade } from '../../../store/operations/operations.facade';

@Component({
  selector: 'app-view-operations',
  standalone: false,
  templateUrl: './view-operations.component.html',
  styleUrl: './view-operations.component.scss',
})
export class ViewOperationsComponent {
  tableDataInside: Operation[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'url', header: 'URL' },
    { field: 'description', header: 'Description' },
  ];
  showDeleteModal: boolean = false;
  selectedOperationId: number | null = null;
  originalOperations: Operation[] = [];
  filteredOperations: Operation[] = [];
  operations$!: Observable<Operation[]>;

  constructor(private router: Router, private facade: OperationsFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter((op) => op?.entity === 'Operation')
      )
      .subscribe(() => this.facade.loadAll());
    this.operations$ = this.facade.all$;

    this.operations$?.pipe(takeUntil(this.destroy$))?.subscribe((operation) => {
      console.log('[View] operations$ – operation=', operation);
      const activeCodes = operation.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
      this.originalOperations = sorted;
      this.filteredOperations = [...sorted];
    });
  }

  onAddOperation() {
    this.router.navigate(['/organizations/add-operation']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteOperation(operationId: any): void {
    console.log(
      '[View] onDeleteOperation() – opening modal for id=',
      operationId
    );
    this.selectedOperationId = operationId;
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
    this.operations$ = this.facade.all$;
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
    this.selectedOperationId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredOperations = this.originalOperations.filter((operation) =>
      Object.values(operation).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditOperation(operation: Operation) {
    this.router.navigate(['/organizations/edit-operation', operation.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewOperation(ct: Operation) {
    this.router.navigate(['/organizations/edit-operation', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}

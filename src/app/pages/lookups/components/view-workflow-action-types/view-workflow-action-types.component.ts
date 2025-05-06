import { Component, ViewChild } from '@angular/core';
import { WorkflowActionType } from '../../store/workflow-action-types/workflow-action-type.model';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { WorkflowActionTypesFacade } from '../../store/workflow-action-types/workflow-action-types.facade';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-view-workflow-action-types',
  standalone: false,
  templateUrl: './view-workflow-action-types.component.html',
  styleUrl: './view-workflow-action-types.component.scss',
})
export class ViewWorkFlowActionTypesComponent {
  tableDataInside: WorkflowActionType[] = [];
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
  selectedWorkflowActionTypeId: number | null = null;
  originalWorkflowActionType: WorkflowActionType[] = [];
  filteredWorkflowActionType: WorkflowActionType[] = [];
  WorkflowActionTypes$!: Observable<WorkflowActionType[]>;

  constructor(
    private router: Router,
    private facade: WorkflowActionTypesFacade
  ) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.WorkflowActionTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.WorkflowActionTypes$.pipe(take(1)).subscribe((v) =>
      console.log('   store currently has:', v)
    );
    console.log('🟢 Calling loadAll() to fetch WorkflowActionTypes');
    this.facade.loadAll();

    this.WorkflowActionTypes$?.pipe(takeUntil(this.destroy$)).subscribe(
      (WorkflowActionTypes) => {
        console.log(
          '🟢 subscribe: received WorkflowActionTypes array:',
          WorkflowActionTypes
        );

        // preserve immutability, then sort by id descending
        const sorted = [...WorkflowActionTypes].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted (by id desc):', sorted);

        this.originalWorkflowActionType = sorted;
        console.log(
          '🟢 originalWorkflowActionType set to:',
          this.originalWorkflowActionType
        );

        this.filteredWorkflowActionType = [...sorted];
        console.log(
          '🟢 filteredWorkflowActionType set to:',
          this.filteredWorkflowActionType
        );
      }
    );
  }

  onAddWorkflowActionType() {
    this.router.navigate(['/lookups/add-workflow-action-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteWorkflowActionType(WorkflowActionTypeId: any): void {
    console.log(
      '[View] onDeleteWorkflowActionType() – opening modal for id=',
      WorkflowActionTypeId
    );
    this.selectedWorkflowActionTypeId = WorkflowActionTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedWorkflowActionTypeId
    );
    if (this.selectedWorkflowActionTypeId !== null) {
      this.facade.delete(this.selectedWorkflowActionTypeId);
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
    this.selectedWorkflowActionTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredWorkflowActionType = this.originalWorkflowActionType.filter(
      (WorkflowActionTypes) =>
        Object.values(WorkflowActionTypes).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditWorkflowActionType(WorkflowActionType: WorkflowActionType) {
    this.router.navigate(
      ['/lookups/edit-workflow-action-types', WorkflowActionType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewWorkflowActionType(ct: WorkflowActionType) {
    this.router.navigate(['/lookups/edit-workflow-action-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}

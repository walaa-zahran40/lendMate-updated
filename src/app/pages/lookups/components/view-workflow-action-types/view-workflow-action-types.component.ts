import { Component, ViewChild } from '@angular/core';
import { WorkflowActionType } from '../../store/workflow-action-types/workflow-action-type.model';
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
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
  ngOnInit(): void {
    console.log('🟢 ngOnInit: loading all…');
    // 1) dispatch the load
    this.facade.loadAll();

    // 2) derive a single stream: filter by isActive, sort descending by id
    this.WorkflowActionTypes$ = (
      this.facade.all$ as Observable<WorkflowActionType[]>
    ).pipe(
      takeUntil(this.destroy$),
      tap((list) => console.log('🔄 raw list from store:', list)),
      // if you want to keep the “active” filter but default undefined→true:
      map((list) => list.filter((i) => i.isActive ?? true)),
      tap((filtered) => console.log('🔄 after filter:', filtered)),
      map((list) => [...list].sort((a, b) => b.id - a.id)),
      tap((sorted) => console.log('🔄 sorted descending:', sorted))
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

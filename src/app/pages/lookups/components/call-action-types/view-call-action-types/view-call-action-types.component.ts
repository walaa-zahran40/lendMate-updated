import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CallActionType } from '../../../store/call-action-types/call-action-type.model';
import { CallActionTypesFacade } from '../../../store/call-action-types/call-action-types.facade';

@Component({
  selector: 'app-view-call-action-types',
  standalone: false,
  templateUrl: './view-call-action-types.component.html',
  styleUrl: './view-call-action-types.component.scss',
})
export class ViewCallActionTypesComponent {
  tableDataInside: CallActionType[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedCallActionTypeId: number | null = null;
  originalCallActionTypes: CallActionType[] = [];
  filteredCallActionTypes: CallActionType[] = [];
  callActionTypes$!: Observable<CallActionType[]>;

  constructor(private router: Router, private facade: CallActionTypesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.callActionTypes$ = this.facade.history$;

    this.callActionTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((call) => {
      // callActionTypes is now callActionTypes[], not any
      const sorted = [...call].sort((a, b) => b?.id - a?.id);
      this.originalCallActionTypes = sorted;
      this.filteredCallActionTypes = [...sorted];
    });
  }

  onAddCallActionType() {
    console.log('🔍 [Component] onAddCallActionType');
    this.router.navigate(['/lookups/add-call-action-types']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCallActionTypeId(callActionTypeId: any): void {
    console.log(
      '[View] onDeleteCallActionType() – opening modal for id=',
      callActionTypeId
    );
    this.selectedCallActionTypeId = callActionTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCallActionTypeId
    );
    if (this.selectedCallActionTypeId !== null) {
      this.facade.delete(this.selectedCallActionTypeId);
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
    this.selectedCallActionTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCallActionTypes = this.originalCallActionTypes.filter(
      (callActionType) =>
        Object.values(callActionType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCallActionType(callActionType: CallActionType) {
    this.router.navigate(
      ['/lookups/edit-call-action-types', callActionType.id],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewCallActionType(ct: CallActionType) {
    this.router.navigate(['/lookups/edit-call-action-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}

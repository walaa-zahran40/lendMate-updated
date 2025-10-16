import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CallType } from '../../../store/call-types/call-type.model';
import { CallTypesFacade } from '../../../store/call-types/call-types.facade';

@Component({
  selector: 'app-view-call-types',
  standalone: false,
  templateUrl: './view-call-types.component.html',
  styleUrl: './view-call-types.component.scss',
})
export class ViewCallTypesComponent {
  tableDataInside: CallType[] = [];
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
  selectedCallTypeId: number | null = null;
  originalCallTypes: CallType[] = [];
  filteredCallTypes: CallType[] = [];
  callTypes$!: Observable<CallType[]>;

  constructor(private router: Router, private facade: CallTypesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.callTypes$ = this.facade.history$;

    this.callTypes$.pipe(takeUntil(this.destroy$)).subscribe((callTypes) => {
      const sorted = [...callTypes].sort((a, b) => b.id - a.id);
      this.originalCallTypes = sorted;
      this.filteredCallTypes = [...sorted];
    });
  }

  onAddCallType() {
    console.log('🔍 [Component] onAddCallType');
    this.router.navigate(['/lookups/add-call-types']);
  }

  ngOnDestroy() {
    console.log('🔍 [Component] ngOnDestroy - cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCallTypeId(callTypeId: any): void {
    console.log(
      '[View] onDeleteCallType() – opening modal for id=',
      callTypeId
    );
    this.selectedIds = [callTypeId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedCallTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCallTypes = this.originalCallTypes.filter((callType) =>
      Object.values(callType).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCallType(callType: CallType) {
    this.router.navigate(['/lookups/edit-call-types', callType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewCallType(ct: CallType) {
    this.router.navigate(['/lookups/edit-call-types', ct.id], {
      queryParams: { mode: 'view' },
    });
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
    this.callTypes$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}

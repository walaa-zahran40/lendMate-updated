import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
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
  ];
  showDeleteModal: boolean = false;
  selectedCallTypeId: number | null = null;
  originalCallTypes: CallType[] = [];
  filteredCallTypes: CallType[] = [];
  callTypes$!: Observable<CallType[]>;

  constructor(private router: Router, private facade: CallTypesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.callTypes$ = this.facade.all$;

    this.callTypes$.pipe(takeUntil(this.destroy$)).subscribe((callTypes) => {
      const activeOnly = callTypes.filter((ct) => ct.isActive); // 👈 filter here
      const sorted = [...activeOnly].sort((a, b) => b.id - a.id);
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
    this.selectedCallTypeId = callTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCallTypeId
    );
    if (this.selectedCallTypeId !== null) {
      this.facade.delete(this.selectedCallTypeId);
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
}

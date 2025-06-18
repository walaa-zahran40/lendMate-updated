import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { SMEClientCodesFacade } from '../../../store/sme-client-codes/sme-client-codes.facade';
import { SMEClientCode } from '../../../store/sme-client-codes/sme-client-code.model';

@Component({
  selector: 'app-view-sme-client-code',
  standalone: false,
  templateUrl: './view-sme-client-code.component.html',
  styleUrl: './view-sme-client-code.component.scss',
})
export class ViewSMEClientCodesComponent {
  tableDataInside: SMEClientCode[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'lowerLimit', header: 'Lower Limit' },
    { field: 'upperLimit', header: 'Upper Limit' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedSMEClientCodeId: number | null = null;
  originalSMEClientCodes: SMEClientCode[] = [];
  filteredSMEClientCodes: SMEClientCode[] = [];
  sMEClientCodes$!: Observable<SMEClientCode[]>;

  constructor(private router: Router, private facade: SMEClientCodesFacade) {}
  ngOnInit() {
    this.facade.loadHistory();
    this.sMEClientCodes$ = this.facade.history$;

    this.sMEClientCodes$
      ?.pipe(takeUntil(this.destroy$))
      ?.subscribe((sMEClientCodes) => {
        // sMEClientCodes is now SMEClientCode[], not any
        const sorted = [...sMEClientCodes].sort((a, b) => b?.id - a?.id);
        this.originalSMEClientCodes = sorted;
        this.filteredSMEClientCodes = [...sorted];
      });
  }

  onAddSMEClientCode() {
    this.router.navigate(['/lookups/add-sme-client-code']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteSMEClientCode(sMEClientCodeId: any): void {
    console.log(
      '[View] onDeleteSMEClientCode() – opening modal for id=',
      sMEClientCodeId
    );
    this.selectedIds = [sMEClientCodeId];
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
    this.sMEClientCodes$ = this.facade.all$;
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
    this.selectedSMEClientCodeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredSMEClientCodes = this.originalSMEClientCodes.filter(
      (sMEClientCode) =>
        Object.values(sMEClientCode).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditSMEClientCode(sMEClientCode: SMEClientCode) {
    this.router.navigate(['/lookups/edit-sme-client-code', sMEClientCode.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewSMEClientCode(ct: SMEClientCode) {
    this.router.navigate(['/lookups/edit-sme-client-code', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}

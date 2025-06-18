import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil, forkJoin } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DocTypesFacade } from '../../../store/doc-types/doc-types.facade';
import { DocType } from '../../../store/doc-types/doc-type.model';

@Component({
  selector: 'app-view-doc-types',
  standalone: false,
  templateUrl: './view-doc-types.component.html',
  styleUrl: './view-doc-types.component.scss',
})
export class ViewDocTypesComponent {
  tableDataInside: DocType[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'relatedFilesPath', header: 'Related File Path' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedDocTypeId: number | null = null;
  originalDocType: DocType[] = [];
  filteredDocType: DocType[] = [];
  docTypes$!: Observable<DocType[]>;

  constructor(private router: Router, private facade: DocTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.docTypes$ = this.facade.history$;
    console.log('🟢 before loadAll, current store value:');
    this.docTypes$
      .pipe(take(1))
      .subscribe((v) => console.log('   store currently has:', v));
    console.log('🟢 Calling loadAll() to fetch docTypes');
    this.facade.loadHistory();

    this.docTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((doc) => {
      // doc is now doc[], not any
      const sorted = [...doc].sort((a, b) => b?.id - a?.id);
      this.originalDocType = sorted;
      this.filteredDocType = [...sorted];
    });
  }

  onAddDocType() {
    this.router.navigate(['/lookups/add-document-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteDocType(docTypeId: any): void {
    console.log('[View] onDeleteDocType() – opening modal for id=', docTypeId);
    this.selectedIds = [docTypeId];
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
  cancelDelete() {
    this.resetDeleteModal();
  }

  refreshCalls() {
    this.facade.loadAll();
    this.docTypes$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedDocTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredDocType = this.originalDocType.filter((docTypes) =>
      Object.values(docTypes).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditDocType(docType: DocType) {
    this.router.navigate(['/lookups/edit-document-types', docType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewDocType(ct: DocType) {
    this.router.navigate(['/lookups/edit-document-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}

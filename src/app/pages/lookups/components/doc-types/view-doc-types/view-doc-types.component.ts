import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, take, takeUntil } from 'rxjs';
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
  ];
  showDeleteModal: boolean = false;
  selectedDocTypeId: number | null = null;
  originalDocType: DocType[] = [];
  filteredDocType: DocType[] = [];
  docTypes$!: Observable<DocType[]>;

  constructor(private router: Router, private facade: DocTypesFacade) {}
  ngOnInit() {
    console.log('🟢 ngOnInit: start');
    this.docTypes$ = this.facade.all$;
    console.log('🟢 before loadAll, current store value:');
    this.docTypes$
      .pipe(take(1))
      .subscribe((v) => console.log('   store currently has:', v));
    console.log('🟢 Calling loadAll() to fetch docTypes');
    this.facade.loadAll();

    this.docTypes$?.pipe(takeUntil(this.destroy$))?.subscribe((doc) => {
      // doc is now doc[], not any
      const activeCodes = doc.filter((code) => code.isActive);
      const sorted = [...activeCodes].sort((a, b) => b?.id - a?.id);
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
    this.selectedDocTypeId = docTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedDocTypeId
    );
    if (this.selectedDocTypeId !== null) {
      this.facade.delete(this.selectedDocTypeId);
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

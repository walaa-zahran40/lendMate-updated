import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { DocumentTypesFacade } from '../../store/document-types/document-types.facade';
import { DocumentType } from '../../store/document-types/document-type.model';
@Component({
  selector: 'app-view-document-types',
  standalone: false,
  templateUrl: './view-document-types.component.html',
  styleUrl: './view-document-types.component.scss',
})
export class ViewDocumentTypesComponent {
  tableDataInside: DocumentType[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
    { field: 'relatedFilesPath', header: 'Related Files Path' }
  ];

  showDeleteModal = false;
  selectedDocumentTypeId: number | null = null;
  originalDocumentTypes: DocumentType[] = [];
  filteredDocumentTypes: DocumentType[] = [];
  documentTypes$!: Observable<DocumentType[]>;

  constructor(private router: Router, private facade: DocumentTypesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading documentTypes');
    this.facade.loadAll();
    this.documentTypes$ = this.facade.items$;

    this.documentTypes$.pipe(takeUntil(this.destroy$)).subscribe((documentTypes) => {
      const sorted = [...documentTypes].sort((a, b) => b.id - a.id);
      console.log('🟢 sorted documentTypes:', sorted);
      this.originalDocumentTypes = sorted;
      this.filteredDocumentTypes = [...sorted];
    });
  }

  onAddDocumentType() {
    this.router.navigate(['/lookups/add-document-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteDocumentType(documentTypeId: number): void {
    console.log(
      '[View] onDeleteDocumentType() – opening modal for id=',
      documentTypeId
    );
    this.selectedDocumentTypeId = documentTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedDocumentTypeId
    );
    if (this.selectedDocumentTypeId !== null) {
      this.facade.delete(this.selectedDocumentTypeId);
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
    this.selectedDocumentTypeId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredDocumentTypes = this.originalDocumentTypes.filter((documentType) =>
      Object.values(documentType).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditDocumentType(documentType: DocumentType) {
    this.router.navigate(['/lookups/edit-document-types', documentType.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewDocumentType(documentType: DocumentType) {
    this.router.navigate(['/lookups/edit-document-types', documentType.id], {
      queryParams: { mode: 'view' },
    });
  }
}

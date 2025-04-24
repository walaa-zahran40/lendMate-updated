import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientFileFacade } from '../../store/client-file/client-file.facade';
import { Document } from '../../../../../shared/interfaces/document.interface';
@Component({
  selector: 'app-view-upload-documents',
  standalone: false,
  templateUrl: './view-upload-documents.component.html',
  styleUrl: './view-upload-documents.component.scss',
})
export class ViewUploadDocumentsComponent {
  tableDataInside: Document[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  documents$ = this.facade.documents$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'fileName', header: 'File Name' },
    { field: 'fileType', header: 'File Type' },
    { field: 'expiryDate', header: 'Expiry Date' },
  ];
  showDeleteModal: boolean = false;
  selectedDocumentId: number | null = null;
  originalDocuments: Document[] = [];
  filteredDocuments: Document[] = [];

  constructor(private router: Router, private facade: ClientFileFacade) {}

  ngOnInit(): void {
    // 1) trigger the load-all-documents action
    this.facade.loadClientFiles();

    // 2) subscribe to the documents$ slice of state
    this.documents$.pipe(takeUntil(this.destroy$)).subscribe((documents) => {
      console.log('raw documents payload:', documents);
      // keep newest-first
      const sorted = [...documents].sort((a, b) => b.id! - a.id!);
      this.originalDocuments = sorted;
      this.filteredDocuments = [...sorted];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onAddDocument() {
    this.router.navigate(['/crm/clients/add-upload-documents']);
  }
  onAddSide(clientId: any) {
    this.router.navigate(['/crm/clients/client-activity-wizard', clientId]);
  }

  onDeleteDocument(documentId: number): void {
    this.selectedDocumentId = documentId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedDocumentId !== null) {
      this.facade.deleteClientFile(this.selectedDocumentId);
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDocumentId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredDocuments = this.originalDocuments.filter((document) =>
      Object.values(document).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditDocument(document: any) {
    this.router.navigate(['/crm/clients/add-upload-documents', document.id], {
      queryParams: { type: document.fileId },
    });
  }
}

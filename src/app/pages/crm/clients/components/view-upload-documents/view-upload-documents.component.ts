import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ViewUploadDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('tableRef') tableRef!: TableComponent;
  documents$ = this.facade.documents$;
  private destroy$ = new Subject<void>();
  clientId!: number;
  originalDocuments: Document[] = [];
  filteredDocuments: Document[] = [];
  first2 = 0;
  showFilters = false;
  showDeleteModal: boolean = false;
  selectedDocumentId: number | null = null;

  readonly colsInside = [
    { field: 'fileName', header: 'File Name' },
    { field: 'fileType', header: 'File Type' },
    { field: 'expiryDate', header: 'Expiry Date' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: ClientFileFacade
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.clientId = +params['id'];
        if (!this.clientId || this.clientId === 0) {
          console.error('Missing or invalid clientId in query params');
          return;
        }

        // ▶️ only load this client’s files
        this.facade.loadClientFilesByClientId(this.clientId);
      });

    this.documents$.pipe(takeUntil(this.destroy$)).subscribe((docs) => {
      const sorted = [...docs].sort((a, b) => b.id! - a.id!);
      this.originalDocuments = sorted;
      this.filteredDocuments = [...sorted];
    });
  }

  onAddDocument() {
    this.router.navigate(['/crm/clients/add-upload-documents', this.clientId]);
  }

  // ViewUploadDocumentsComponent
  onDeleteDocument(documentId: number): void {
    this.facade.deleteClientFile(documentId, this.clientId);
  }

  onEditDocument(doc: any) {
    this.router.navigate(['../add-upload-documents', this.clientId, doc.id], {
      relativeTo: this.route,
    });
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredDocuments = this.originalDocuments.filter((d) =>
      Object.values(d).some((v) => v?.toString().toLowerCase().includes(lower))
    );
  }

  onToggleFilters(val: boolean) {
    this.showFilters = val;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onAddSide(_documentId: any) {
    // re-open the client wizard, passing the clientId
    this.router.navigate([
      '/crm/clients/client-activity-wizard',
      this.clientId,
    ]);
  }
  confirmDelete() {
    if (this.selectedDocumentId !== null) {
      this.facade.deleteClientFile(this.selectedDocumentId, this.clientId);
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
}

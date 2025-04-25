import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { ClientFileFacade } from '../../store/client-file/client-file.facade';
import { Document } from '../../../../../shared/interfaces/document.interface';
import { DocumentTypeService } from '../../store/document-type/document-type.service';
import { DocumentTypeFacade } from '../../store/document-type/document-type.facade';
import { DocumentType } from '../../../../../shared/interfaces/document-type.interface';
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
    { field: 'expiryDate', header: 'Expiry Date', pipe: 'date:"YYYY-MM-DD"' },
  ];
  documentTypes: DocumentType[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: ClientFileFacade,
    private documentTypeFacade: DocumentTypeFacade
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
    this.documentTypeFacade.loadDocumentTypes(); // 🟢 Load once on init

    this.documentTypeFacade.documentTypes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((types) => {
        this.documentTypes = types;
      });

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.clientId = +params['id'];
        if (!this.clientId || this.clientId === 0) {
          console.error('Missing or invalid clientId in query params');
          return;
        }

        this.facade.loadClientFilesByClientId(this.clientId);
      });

    combineLatest([this.documents$, this.documentTypeFacade.documentTypes$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([docs, types]) => {
        this.documentTypes = types;

        const sorted = [...docs].sort((a, b) => b.id! - a.id!);

        // 🔍 Add this log
        console.log('[ViewUploadDocumentsComponent] Incoming docs:', sorted);

        this.filteredDocuments = sorted.map((doc) => {
          const fileTypeId = doc.fileId;
          console.log('[ViewUploadDocumentsComponent] Mapping doc:', {
            id: doc.id,
            fileTypeId,
          });

          return {
            ...doc,
            fileType: doc.documentTypeName, // ✅ USE THIS, NOT getFileTypeName()
            expiryDate: doc.expiryDate ?? '',
          };
        });

        this.originalDocuments = [...this.filteredDocuments];
      });
  }
  getFileTypeName(fileTypeId: number): string {
    const matchedType = this.documentTypes.find((t) => t.id === fileTypeId);

    if (matchedType) {
      console.log(
        `[getFileTypeName] Found document type: ${matchedType.name} for ID: ${fileTypeId}`
      );
      return matchedType.name;
    } else {
      console.warn(
        `[getFileTypeName] No matching document type found for ID: ${fileTypeId}`
      );
      return 'N/A';
    }
  }

  onAddDocument() {
    this.router.navigate(['/crm/clients/add-upload-documents', this.clientId]);
  }

  // ViewUploadDocumentsComponent
  onDeleteDocument(documentId: number): void {
    this.selectedDocumentId = documentId;
    this.showDeleteModal = true;
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
  onEditDocument(doc: any) {
    this.router.navigate([
      '/crm/clients/add-upload-documents',
      this.clientId,
      doc.id,
    ]);
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
}

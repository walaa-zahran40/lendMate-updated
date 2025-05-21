import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { ClientFilesFacade } from '../../../../store/client-file/client-files.facade';
import { DocumentType } from '../../../../../../../shared/interfaces/document-type.interface';
import { ClientFile } from '../../../../store/client-file/client-file.model';
import { DocTypesFacade } from '../../../../../../lookups/store/doc-types/doc-types.facade';

@Component({
  selector: 'app-view-upload-documents',
  standalone: false,
  templateUrl: './view-upload-documents.component.html',
  styleUrl: './view-upload-documents.component.scss',
})
export class ViewUploadDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('tableRef') tableRef!: TableComponent;
  documents$ = this.facade.files$;
  private destroy$ = new Subject<void>();

  clientId = this.route.snapshot.params['clientId'];
  originalDocuments: ClientFile[] = [];
  filteredDocuments: any[] = [];
  first2 = 0;
  showFilters = false;
  showDeleteModal = false;
  selectedDocumentId: number | null = null;

  readonly colsInside = [
    { field: 'fileName', header: 'File Name' },
    { field: 'fileType', header: 'File Type' },
    { field: 'expiryDate', header: 'Expiry Date', pipe: 'date:"YYYY-MM-DD"' },
  ];
  documentTypes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: ClientFilesFacade,
    private documentTypeFacade: DocTypesFacade
  ) {
    console.log('[ctor] raw queryParams id=', this.clientId);
  }

  ngOnInit(): void {
    console.log('[ngOnInit] snapshot.params=', this.route.snapshot.params);

    this.clientId =
      this.route.snapshot.params['clientId'] ??
      this.route.snapshot.queryParams['id'];
    console.log('[ngOnInit] resolved clientId=', this.clientId);

    this.facade.loadByClientId(this.clientId);
    console.log('[ngOnInit] facade.loadOne called for', this.clientId);

    this.documentTypeFacade.loadAll();
    console.log('[ngOnInit] documentTypeFacade.loadDocumentTypes()');

    combineLatest([this.facade.files$, this.documentTypeFacade.all$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([docs, types]) => {
        console.log('[subscribe] docs=', docs);
        console.log('[subscribe] types=', types);

        this.documentTypes = types;
        const sorted = [...docs].sort((a, b) => b.id! - a.id!);
        console.log('[subscribe] sorted docs=', sorted);

        this.filteredDocuments = sorted.map((doc) => {
          const fileTypeName = this.getFileTypeName(doc.documentTypeId);
          console.log(`[map] doc.id=${doc.id} → fileTypeName=${fileTypeName}`);
          return {
            ...doc,
            fileType: fileTypeName,
            expiryDate: doc.expiryDate ?? '',
          };
        });

        this.originalDocuments = [...this.filteredDocuments];
        console.log(
          '[subscribe] filteredDocuments ready=',
          this.filteredDocuments
        );
      });
  }
  ngOnDestroy() {
    console.log('[ngOnDestroy] cleaning up');
    this.destroy$.next();
    this.destroy$.complete();
  }
  getFileTypeName(fileTypeId: any): string {
    console.log('[getFileTypeName] looking for ID=', fileTypeId);
    const matchedType = this.documentTypes.find((t) => t.id === fileTypeId);
    if (matchedType) {
      console.log(
        `[getFileTypeName] Found: id=${matchedType.id}, name=${matchedType.name}`
      );
      return matchedType.name;
    } else {
      console.warn(
        `[getFileTypeName] No match for ID=${fileTypeId}, returning N/A`
      );
      return 'N/A';
    }
  }

  onAddDocument() {
    console.log(
      '[onAddDocument] navigating to add-upload-documents',
      this.clientId
    );
    this.router.navigate(['/crm/clients/add-upload-documents', this.clientId]);
  }

  onDeleteDocument(documentId: number): void {
    console.log('[onDeleteDocument] documentId=', documentId);
    this.selectedDocumentId = documentId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log('[confirmDelete] selectedDocumentId=', this.selectedDocumentId);
    if (this.selectedDocumentId !== null) {
      this.facade.delete(this.selectedDocumentId, this.clientId);
      console.log('[confirmDelete] facade.delete called');
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    console.log('[cancelDelete]');
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log(
      '[resetDeleteModal] hiding modal and clearing selectedDocumentId'
    );
    this.showDeleteModal = false;
    this.selectedDocumentId = null;
  }

  onEditDocument(doc: any) {
    console.log('[onEditDocument] doc=', doc);
    this.router.navigate([
      '/crm/clients/edit-upload-documents',
      this.clientId,
      doc.id,
    ]);
  }

  onSearch(keyword: string) {
    console.log('[onSearch] keyword=', keyword);
    const lower = keyword.toLowerCase();
    this.filteredDocuments = this.originalDocuments.filter((d) =>
      Object.values(d).some((v) => v?.toString().toLowerCase().includes(lower))
    );
    console.log('[onSearch] filteredDocuments=', this.filteredDocuments);
  }

  onToggleFilters(val: boolean) {
    console.log('[onToggleFilters] showFilters=', val);
    this.showFilters = val;
  }

  onAddSide(_documentId: any) {
    console.log('[onAddSide] reopening client wizard for', this.clientId);
    this.router.navigate([
      '/crm/clients/client-activity-wizard',
      this.clientId,
    ]);
  }
  onViewDocument(doc: any) {
    console.log('[onViewDocument] doc=', doc);
    this.router.navigate([
      '/crm/clients/edit-upload-documents',
      this.clientId,
      doc.id,
    ]);
  }
}

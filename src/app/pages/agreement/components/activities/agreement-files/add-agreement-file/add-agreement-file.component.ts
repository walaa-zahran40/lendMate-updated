import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  filter,
  take,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { DocType } from '../../../../../lookups/store/doc-types/doc-type.model';
import { DocTypesFacade } from '../../../../../lookups/store/doc-types/doc-types.facade';
import { MessageService } from 'primeng/api';
import { AgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';
import { AgreementFile } from '../../../../store/agreement-files/agreement-file.model';

@Component({
  selector: 'app-add-agreement-file',
  standalone: false,
  templateUrl: './add-agreement-file.component.html',
  styleUrl: './add-agreement-file.component.scss',
})
export class AddAgreementFileComponent implements OnInit {
  agreementId!: number;
  selectedFile!: File;
  selectedDocuments: any[] = [];
  expiryDate!: Date;
  preview: any;
  documentId!: number | null;
  editMode: boolean = false;
  viewMode: boolean = false;
  addAgreementFilesForm!: FormGroup;
  documentTypes: any[] = [];
  private destroy$ = new Subject<void>();
  previewUrl?: any;
  record$!: Observable<any>;
  recordId!: number;
  mode!: 'add' | 'edit' | 'view';
  viewOnly = false;
  documentTypes$!: Observable<DocType[]>;
  currentRecord?: any | null = null;
  routeId: any;
  existingFileName?: string;
  existingFileId?: number;
  existingFileUrl?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementFilesFacade,
    private router: Router,
    private facadeDocumentTypes: DocTypesFacade,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ===== 1) Resolve routing + mode =====
    const routeIdParam = Number(this.route.snapshot.params['id']); // can be PO id (add) or File id (edit/view)
    const qpMode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';

    // If there is an explicit :documentId param, prefer it in edit/view paths
    const documentIdParam = this.route.snapshot.paramMap.get('documentId');
    const docIdCandidate = documentIdParam
      ? Number(documentIdParam)
      : routeIdParam;

    this.mode = qpMode;
    this.viewMode = qpMode === 'view';
    this.editMode = qpMode === 'edit';

    // In edit/view, the route id represents the FILE id; in add, it's the parent PO id
    if (this.editMode || this.viewMode) {
      this.recordId = docIdCandidate;
      this.documentId = docIdCandidate;
    } else {
      this.routeId = routeIdParam;
    }

    // Always present in your route
    this.agreementId = Number(this.route.snapshot.paramMap.get('id')!);

    // ===== 2) Build form (file required only in ADD) =====
    this.addAgreementFilesForm = this.fb.group({
      documentTypeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode || this.viewMode ? [] : Validators.required],
    });

    // ===== 3) Load and normalize document types =====
    this.facadeDocumentTypes.loadAll();
    this.documentTypes$ = this.facadeDocumentTypes.all$.pipe(
      map((arr) =>
        Array.isArray(arr) ? arr.map((d) => ({ ...d, id: Number(d.id) })) : []
      )
    );

    // keep a local cache if you need it elsewhere
    this.documentTypes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((types) => (this.documentTypes = types));

    // ===== 4) ADD mode early exit (enable controls) =====
    if (!this.editMode && !this.viewMode) {
      this.addAgreementFilesForm
        .get('documentTypeId')
        ?.enable({ emitEvent: false });
      return;
    }

    // ===== 5) EDIT / VIEW: fetch record, then patch once docTypes are ready =====
    this.facade.loadOne(this.documentId!);
    this.record$ = this.facade.byId$(this.documentId!); // ✅ entity stream

    const recordReady$ = this.record$.pipe(
      filter((ct): ct is AgreementFile => !!ct && ct != null)
    );
    const docTypesReady$ = this.documentTypes$.pipe(
      filter((arr) => Array.isArray(arr) && arr.length > 0)
    );

    combineLatest([recordReady$, docTypesReady$])
      .pipe(take(1))
      .subscribe({
        next: ([ct]) => {
          this.currentRecord = ct;

          // Coerce to expected types for controls/components
          const documentTypeId = Number(ct.documentTypeId);
          const expiry = ct.expiryDate
            ? new Date(ct.expiryDate as string)
            : null;

          // 1) Patch BEFORE disabling any control
          this.addAgreementFilesForm.patchValue(
            {
              id: ct?.id,
              documentTypeId, // number to match optionValue="id"
              expiryDate: expiry,
              file: null, // never prefill file input
            },
            { emitEvent: false }
          );

          // 2) Help PrimeNG resolve selected option
          const docCtrl = this.addAgreementFilesForm.get('documentTypeId')!;
          docCtrl.setValue(documentTypeId, { emitEvent: false });
          docCtrl.updateValueAndValidity({ emitEvent: false });

          // 3) Populate existing file info for child preview/links
          this.existingFileName = ct.fileName ?? undefined;
          this.existingFileId = ct.fileId ?? undefined;
          this.existingFileUrl = ct.filePath ?? undefined;

          // 4) Adjust enable/disable AFTER patching
          if (this.viewMode) {
            this.addAgreementFilesForm.disable({ emitEvent: false });
          } else {
            // Edit: allow changing expiry, lock doc type
            docCtrl.disable({ emitEvent: false });
            this.addAgreementFilesForm
              .get('expiryDate')
              ?.enable({ emitEvent: false });
            this.addAgreementFilesForm
              .get('file')
              ?.enable({ emitEvent: false });
          }

          // 5) File control has no validators in edit/view
          const fileCtrl = this.addAgreementFilesForm.get('file')!;
          fileCtrl.clearValidators();
          fileCtrl.updateValueAndValidity({ emitEvent: false });

          // mark for change detection (OnPush safety)
          this.cdr.markForCheck();
        },
        error: (e) => console.error('❌ Failed to patch edit/view form:', e),
      });
  }

  encodePathToHex(path: string | undefined | null): string {
    if (!path) {
      console.warn('[encodePathToHex] Input path is empty or undefined');
      return '';
    }

    return Array.from(path)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

  // downloadFile(preview = false) {
  //   this.preview = true;
  //   // 1) normalize slashes
  //   const rawPath = (this.selectedFile as any).filePath;
  //   const normalized = rawPath.replace(/\\/g, '/');
  //   console.log('normalized:', normalized);

  //   // 2) strip drive letter (anything before the first colon)
  //   //    -> "/uploads/Clients-2034/Identity/…"
  //   const relativePath = normalized.replace(/^[A-Za-z]:/, '');

  //   // 3) build the real URL your server exposes
  //   //    adjust `environment.fileServerUrl` (or hardcode) to match your API/static-hosting
  //   const fileUrl = `${environment.apiUrl2}${relativePath}`;
  //   console.log('fileUrl:', fileUrl);

  //   // 4) fetch it (or open directly)
  //   this.http.get(fileUrl, { responseType: 'blob' }).subscribe({
  //     next: (blob) => {
  //       const blobUrl = window.URL.createObjectURL(blob);

  //       console.log('preview');
  //       // show it in an <img>
  //       this.previewUrl = blobUrl;
  //       console.log('prev', this.previewUrl);
  //       const filename = (this.selectedFile as any).fileName;
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: (err) => {
  //       console.error('Download failed', err);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Download error',
  //         detail: 'Could not download the document.',
  //       });
  //     },
  //   });
  // }

  onFileSelected(file: File | null) {
    // clear old preview
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;

    if (!file) {
      this.addAgreementFilesForm.get('file')!.reset();
      return;
    }

    this.addAgreementFilesForm.get('file')!.setValue(file);
    this.previewUrl = URL.createObjectURL(file);
  }

  addOrEditAgreementFiles() {
    // Block in pure view mode
    if (this.viewMode) {
      console.warn('[addDocument] called in view mode; skipping.');
      return;
    }

    // If the doc type control is disabled (edit/view), temporarily enable to read its value
    const docTypeCtrl = this.addAgreementFilesForm.get('documentTypeId');
    const wasDocTypeDisabled = !!docTypeCtrl?.disabled;
    if (wasDocTypeDisabled) docTypeCtrl?.enable({ emitEvent: false });

    // Validate
    if (this.addAgreementFilesForm.invalid) {
      this.addAgreementFilesForm.markAllAsTouched();
      if (wasDocTypeDisabled) docTypeCtrl?.disable({ emitEvent: false });
      return;
    }

    // Read raw values safely
    const { documentTypeId, expiryDate, file } =
      this.addAgreementFilesForm.getRawValue();

    // Normalize documentTypeId (might be an object or a number)
    const docTypeId: number =
      typeof documentTypeId === 'object' && documentTypeId
        ? Number(documentTypeId.id)
        : Number(documentTypeId);

    // Normalize file(s) to an array
    const files: File[] = Array.isArray(file) ? file : file ? [file] : [];

    // Helper: format date (you already have formatDateWithoutTime on the class)
    const expiry = this.formatDateWithoutTime(expiryDate);

    if (this.editMode) {
      // EDIT: update metadata, and optionally upload a new binary if provided
      if (files.length > 0) {
        // ➜ multipart update with file(s)
        const formData = new FormData();
        formData.append('id', String(this.documentId!));
        formData.append('agreementId', String(this.agreementId));
        formData.append('documentTypeId', String(docTypeId));
        formData.append('expiryDate', expiry);

        // If backend expects ONE file under key "file", use the first:
        formData.append('file', files[0]);

        // If backend supports multiple, use this instead:
        // for (const f of files) formData.append('files', f);

        this.facade.update({
          id: this.documentId!,
          payload: {
            id: this.documentId!,
            agreementId: this.agreementId,
            fileId: this.existingFileId!, // you already set this when patching
            expiryDate: this.toApiDateTime(expiryDate),
          },
        });
      } else {
        // ➜ JSON-only update (no new binary selected)
        const payload: any = {
          id: this.documentId!,
          agreementId: this.agreementId,
          documentTypeId: docTypeId,
          expiryDate: expiry,
        };
        this.facade.update(payload);
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Document updated successfully',
      });

      if (this.addAgreementFilesForm.valid)
        this.addAgreementFilesForm.markAsPristine();

      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.agreementId}`],
        { queryParams: { id: this.agreementId } }
      );
    } else {
      // ADD: must have at least one file
      if (files.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'File required',
          detail: 'Please choose a file to upload.',
        });
        if (wasDocTypeDisabled) docTypeCtrl?.disable({ emitEvent: false });
        return;
      }

      const formData = new FormData();
      formData.append('agreementId', String(this.agreementId));
      formData.append('documentTypeId', String(docTypeId));
      formData.append('expiryDate', expiry);

      // If backend expects ONE file under key "file":
      formData.append('file', files[0]);

      // If backend supports multiple files, switch to:
      // for (const f of files) formData.append('files', f);

      // ADD branch (replace the current FormData code)
      this.facade.create({
        agreementId: this.agreementId,
        documentTypeId: docTypeId,
        expiryDate: this.toApiDateTime(expiryDate), // "YYYY-MM-DDT00:00:00"
        file: files[0],
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Uploaded',
        detail: 'Document uploaded successfully',
      });

      if (this.addAgreementFilesForm.valid)
        this.addAgreementFilesForm.markAsPristine();

      this.router.navigate(
        [
          `/agreement/activities/wizard-agreement/view-agreement-files/${this.agreementId}`,
        ],
        { queryParams: { id: this.agreementId } }
      );
    }

    // Restore disabled state of doc type if we changed it
    if (wasDocTypeDisabled) docTypeCtrl?.disable({ emitEvent: false });
  }
  private toApiDateTime(date: Date | string): string {
    const d = date instanceof Date ? date : new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}T00:00:00`;
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addAgreementFilesForm.dirty;
  }
  onFileRemoved(event: any) {
    this.addAgreementFilesForm.get('file')!.reset();
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = undefined;
    }
  }
  private formatDateWithoutTime(date: Date): string {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime()))
      throw new Error(`Invalid date passed to formatDateWithoutTime: ${date}`);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

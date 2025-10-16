import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DocType } from '../../../../../../../../lookups/store/doc-types/doc-type.model';
import { ClientFile } from '../../../../../../store/client-file/client-file.model';
import { ClientFilesFacade } from '../../../../../../store/client-file/client-files.facade';
import { UploadDocBundle } from '../../../../../../resolvers/upload-document.resolver';

@Component({
  selector: 'app-add-upload-documents',
  standalone: false,
  templateUrl: './add-upload-documents.component.html',
  styleUrls: ['./add-upload-documents.component.scss'], // <-- plural
})
export class AddUploadDocumentsComponent {
  clientId!: number;
  documentId: number | null = null;

  mode!: 'add' | 'edit' | 'view';
  viewMode = false;
  editMode = false;

  uploadForm!: FormGroup;

  docTypes: DocType[] = [];
  currentRecord: ClientFile | null = null;

  previewUrl?: string;
  existingFileName?: string;
  existingFileId?: number;
  existingFileUrl?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientFilesFacade,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ===== 1) Resolve all upfront =====
    const data = this.route.snapshot.data['data'] as UploadDocBundle;
    this.clientId = data?.clientId;
    this.documentId = data?.documentId;
    this.mode = data?.mode;
    this.viewMode = this.mode === 'view';
    this.editMode = this.mode === 'edit';
    this.docTypes = data?.docTypes;
    this.currentRecord = data?.file;

    // ===== 2) Build form =====
    this.uploadForm = this.fb.group({
      documentTypeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode || this.viewMode ? [] : Validators.required],
    });

    // ===== 3) If edit/view: patch once =====
    if (this.currentRecord) {
      const ct = this.currentRecord;
      this.existingFileName = ct.fileName ?? undefined;
      this.existingFileId = ct.fileId ?? undefined;
      this.existingFileUrl = ct.filePath ?? undefined;

      const documentTypeId = Number(ct.documentTypeId);
      const expiry = ct.expiryDate ? new Date(ct.expiryDate as string) : null;

      this.uploadForm.patchValue(
        { documentTypeId, expiryDate: expiry, file: null },
        { emitEvent: false }
      );

      if (this.viewMode) {
        this.uploadForm.disable({ emitEvent: false });
      } else {
        // edit: lock doc type, allow expiry & file
        this.uploadForm.get('documentTypeId')?.disable({ emitEvent: false });
        this.uploadForm.get('expiryDate')?.enable({ emitEvent: false });
        this.uploadForm.get('file')?.enable({ emitEvent: false });
        console.log(
          'DocType disabled?',
          this.uploadForm.get('documentTypeId')?.disabled
        );

        // file control has no validators in edit/view
        const fileCtrl = this.uploadForm.get('file')!;
        fileCtrl.clearValidators();
        fileCtrl.updateValueAndValidity({ emitEvent: false });
      }
      this.cdr.markForCheck();
    }
  }

  onFileSelected(ev: any) {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = undefined;

    let file: File | null = null;

    // <input type="file"> change event
    if (ev?.target?.files) file = ev.target.files[0] ?? null;
    // PrimeNG or custom object: { files: File[] }
    else if (Array.isArray(ev?.files)) file = ev.files[0] ?? null;
    // Direct File emission (in case child already emits File)
    else if (ev instanceof File) file = ev;

    if (!file) {
      this.uploadForm.get('file')!.reset();
      return;
    }

    this.uploadForm.get('file')!.setValue(file);
    this.previewUrl = URL.createObjectURL(file);
  }

  addDocument() {
    if (this.viewMode) return;

    // Temporarily enable docType to read value if disabled
    const docTypeCtrl = this.uploadForm.get('documentTypeId')!;
    const wasDocTypeDisabled = docTypeCtrl.disabled;
    if (wasDocTypeDisabled) docTypeCtrl.enable({ emitEvent: false });

    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      if (wasDocTypeDisabled) docTypeCtrl.disable({ emitEvent: false });
      return;
    }

    const { documentTypeId, expiryDate, file } = this.uploadForm.getRawValue();
    const docTypeId =
      typeof documentTypeId === 'object' && documentTypeId
        ? Number(documentTypeId.id)
        : Number(documentTypeId);

    const files: File[] = Array.isArray(file) ? file : file ? [file] : [];
    const expiry = this.formatDateWithoutTime(expiryDate);

    if (this.editMode && this.documentId) {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append('id', String(this.documentId));
        formData.append('clientId', String(this.clientId));
        formData.append('documentTypeId', String(docTypeId));
        formData.append('expiryDate', expiry);
        formData.append('file', files[0]);
        this.facade.update(this.documentId, formData as any);
      } else {
        const payload = {
          id: this.documentId,
          clientId: this.clientId,
          documentTypeId: docTypeId,
          expiryDate: expiry,
        };
        this.facade.update(this.documentId, payload);
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Document updated successfully',
      });
      if (this.uploadForm.valid) this.uploadForm.markAsPristine();

      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.clientId}`],
        {
          queryParams: { id: this.clientId },
        }
      );
    } else {
      if (files.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'File required',
          detail: 'Please choose a file to upload.',
        });
        if (wasDocTypeDisabled) docTypeCtrl.disable({ emitEvent: false });
        return;
      }

      const formData = new FormData();
      formData.append('clientId', String(this.clientId));
      formData.append('documentTypeId', String(docTypeId));
      formData.append('expiryDate', expiry);
      formData.append('file', files[0]);
      this.facade.create(formData as any);

      this.messageService.add({
        severity: 'success',
        summary: 'Uploaded',
        detail: 'Document uploaded successfully',
      });
      if (this.uploadForm.valid) this.uploadForm.markAsPristine();

      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.clientId}`],
        {
          queryParams: { id: this.clientId },
        }
      );
    }

    if (wasDocTypeDisabled) docTypeCtrl.disable({ emitEvent: false });
  }

  onFileRemoved() {
    this.uploadForm.get('file')!.reset();
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = undefined;
    }
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.uploadForm.dirty;
  }

  private formatDateWithoutTime(date: Date): string {
    const d = date instanceof Date ? date : new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

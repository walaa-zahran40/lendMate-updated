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
  race,
} from 'rxjs';
import { DocType } from '../../../../../lookups/store/doc-types/doc-type.model';
import { DocTypesFacade } from '../../../../../lookups/store/doc-types/doc-types.facade';
import { MessageService } from 'primeng/api';
import { LeasingAgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';
import { AgreementFile } from '../../../../store/agreement-files/agreement-file.model';
import { Actions, ofType } from '@ngrx/effects';
import * as A from '../../../../store/agreement-files/agreement-files.actions';
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
    private facade: LeasingAgreementFilesFacade,
    private router: Router,
    private facadeDocumentTypes: DocTypesFacade,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private actions$: Actions
  ) {}

  ngOnInit() {
    // 1) resolve mode + ids (your existing code) ...
    const qpMode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = qpMode === 'edit';
    this.viewMode = qpMode === 'view';

    this.agreementId = Number(
      this.route.snapshot.paramMap.get('leasingAgreementId') ??
        this.route.snapshot.paramMap.get('id')
    );

    const fileIdFromRoute = Number(this.route.snapshot.paramMap.get('regId'));
    if (this.editMode || this.viewMode) {
      this.documentId = fileIdFromRoute;
    }

    // ✅ 2) BUILD THE FORM *NOW* (before any template bindings run)
    this.addAgreementFilesForm = this.fb.group({
      documentTypeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode || this.viewMode ? [] : Validators.required],
    });
    if (this.editMode || this.viewMode) {
      this.documentId = fileIdFromRoute;
      if (
        !Number.isFinite(this.documentId) ||
        !Number.isFinite(this.agreementId)
      ) {
        console.error('❌ Missing ids from route', {
          agreementId: this.agreementId,
          documentId: this.documentId,
          params: this.route.snapshot.paramMap,
        });
        return;
      }
    } else {
      // add mode sanity check
      if (!Number.isFinite(this.agreementId)) {
        console.error('❌ Missing agreement :id in add route');
        return;
      }
    }
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

  addOrEditAgreementFiles(): void {
    if (this.viewMode) return;

    const agreementId = Number(
      this.route.snapshot.params['id'] ?? this.agreementId ?? 0
    );

    // Temporarily enable docType to read value if disabled
    const docTypeCtrl = this.addAgreementFilesForm.get('documentTypeId');
    const wasDocTypeDisabled = !!docTypeCtrl?.disabled;
    if (wasDocTypeDisabled) docTypeCtrl?.enable({ emitEvent: false });

    // Validate
    if (this.addAgreementFilesForm.invalid) {
      this.addAgreementFilesForm.markAllAsTouched();
      if (wasDocTypeDisabled) docTypeCtrl?.disable({ emitEvent: false });
      return;
    }

    // Extract & normalize values
    const { documentTypeId, expiryDate, file } =
      this.addAgreementFilesForm.getRawValue();
    const docTypeId: number =
      typeof documentTypeId === 'object' && documentTypeId
        ? Number(documentTypeId.id)
        : Number(documentTypeId);
    const expiry = this.toApiDateTime(expiryDate);
    const files: File[] = Array.isArray(file) ? file : file ? [file] : [];

    const goToList = () =>
      this.router.navigate([
        `/agreement/activities/wizard-agreement/view-agreement-files/${agreementId}`,
      ]);
    const goToUpdateList = () =>
      this.router.navigate([
        `/agreement/activities/wizard-agreement/view-agreement-files/${agreementId}`,
      ]);

    if (this.editMode) {
      // ===== EDIT =====
      const id = Number(this.documentId);

      const doneSub = race(
        this.actions$.pipe(
          ofType(A.LeasingAgreementFilesActions.updateSuccess),
          take(1),
          map(() => true)
        ),
        this.actions$.pipe(
          ofType(A.LeasingAgreementFilesActions.updateFailure),
          take(1),
          map(() => false)
        )
      )
        .pipe(take(1))
        .subscribe((ok) => {
          if (ok) {
            this.facade.loadByLeasingAgreementId(agreementId); // refresh table
            this.messageService.add({
              severity: 'success',
              summary: 'Updated',
              detail: 'Document updated successfully',
            });
            if (this.addAgreementFilesForm.valid)
              this.addAgreementFilesForm.markAsPristine();

            goToUpdateList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Update failed',
              detail: 'Could not update document.',
            });
          }
        });

      if (files.length > 0) {
        // Multipart update WITH binary
        const formData = new FormData();
        formData.append('id', String(id));
        formData.append('agreementId', String(agreementId));
        formData.append('documentTypeId', String(docTypeId));
        formData.append('expiryDate', expiry);
        formData.append('file', files[0]); // must match backend param name
        this.facade.update(id, formData as any);
      } else {
        // JSON-only metadata update
        this.facade.update(id, {
          id,
          agreementId,
          documentTypeId: docTypeId,
          expiryDate: expiry,
        });
      }

      void doneSub; // silence unused var warning
    } else {
      // ===== ADD =====
      if (files.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'File required',
          detail: 'Please choose a file.',
        });
        if (wasDocTypeDisabled) docTypeCtrl?.disable({ emitEvent: false });
        return;
      }

      const formData = new FormData();
      formData.append('agreementId', String(agreementId));
      formData.append('documentTypeId', String(docTypeId));
      formData.append('expiryDate', expiry);
      formData.append('file', files[0]);

      const doneSub = race(
        this.actions$.pipe(
          ofType(A.LeasingAgreementFilesActions.createSuccess),
          take(1),
          map(() => true)
        ),
        this.actions$.pipe(
          ofType(A.LeasingAgreementFilesActions.createFailure),
          take(1),
          map(() => false)
        )
      )
        .pipe(take(1))
        .subscribe((ok) => {
          if (ok) {
            this.facade.loadByLeasingAgreementId(agreementId); // make sure the new row is in the store
            this.messageService.add({
              severity: 'success',
              summary: 'Uploaded',
              detail: 'Document uploaded successfully',
            });
            if (this.addAgreementFilesForm.valid)
              this.addAgreementFilesForm.markAsPristine();
            goToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Upload failed',
              detail: 'Could not upload document.',
            });
          }
        });

      this.facade.create(formData as any);
      void doneSub;
    }

    // Restore disabled state if we changed it
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
  onFileRemoved() {
    this.addAgreementFilesForm.get('file')!.reset();
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = undefined;
    }
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, filter, take, combineLatest } from 'rxjs';
import { DocType } from '../../../../../lookups/store/doc-types/doc-type.model';
import { DocTypesFacade } from '../../../../../lookups/store/doc-types/doc-types.facade';
import { LeasingAgreement } from '../../../../store/agreements/agreement.model';
import { AgreementFile } from '../../../../store/agreement-files/agreement-file.model';
import { AgreementFilesFacade } from '../../../../store/agreement-files/agreement-files.facade';
import { LeasingAgreementsFacade } from '../../../../store/agreements/agreements.facade';

@Component({
  selector: 'app-add-agreement-file',
  standalone: false,
  templateUrl: './add-agreement-file.component.html',
  styleUrl: './add-agreement-file.component.scss',
})
export class AddAgreementFileComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addAgreementFileForm!: FormGroup;
  retrivedId: any;
  routeId: any;
  recordId!: number;
  agreements$!: Observable<LeasingAgreement[]>;
  documentTypes$!: Observable<DocType[]>;
  private destroy$ = new Subject<void>();
  currentRecord?: AgreementFile | null = null; // <— add this
  existingFileName?: string;
  existingFileId?: number;
  existingFileUrl?: string;
  record$!: Observable<AgreementFile | null>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementFilesFacade,
    private facadeAgreements: LeasingAgreementsFacade,
    private facadeDocumentTypes: DocTypesFacade,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');

    // 1) Read params + mode
    const routeParamIdRaw = this.route.snapshot.params['id'];
    const routeParamId = Number(routeParamIdRaw);
    this.routeId = routeParamId;
    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';

    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    if (this.editMode || this.viewOnly) {
      // In edit/view, the param is the FILE id
      this.recordId = routeParamId;
    } else {
      // In add, the param is the PO id
      this.routeId = routeParamId;
    }

    console.log('🔍 Params:', {
      routeParamIdRaw,
      routeParamId,
      routeId: this.routeId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    // 2) Load dropdown data
    this.facadeAgreements.loadAll();
    this.agreements$ = this.facadeAgreements.all$;

    this.facadeDocumentTypes.loadAll();
    this.documentTypes$ = this.facadeDocumentTypes.all$.pipe(
      map((list) => (list ?? []).map((d) => ({ ...d, id: Number(d.id) })))
    );

    // 3) Build form
    this.addAgreementFileForm = this.fb.group({
      id: [null],
      agreementId: [null, Validators.required],
      documentTypeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode || this.viewOnly ? [] : Validators.required],
    });

    // 4) Add mode: seed PO id and lock it
    const poCtrl = this.addAgreementFileForm.get('agreementId')!;
    if (this.mode === 'add') {
      poCtrl.setValue(this.routeId, { emitEvent: false });
      poCtrl.disable({ emitEvent: false });
      this.addAgreementFileForm.patchValue({
        agreementId: this.routeId,
      });
    } else if (this.viewOnly) {
      this.addAgreementFileForm.disable({ emitEvent: false });
    }

    // 5) Edit/View: load record and patch AFTER options are ready
    if (this.editMode || this.viewOnly) {
      console.log('📡 loading record by id:', this.recordId);
      this.facade.loadByIdEdit(this.recordId);

      // Prefer a byId$ selector if available
      this.record$ = (this.facade as any).byId$
        ? (this.facade as any).byId$(this.recordId)
        : this.facade.all$.pipe(
            map((list) => list?.find((x) => x.id === this.recordId) ?? null)
          );

      // Gate until: record has documentTypeId, and options are loaded
      const recordReady$ = this.record$.pipe(
        filter((ct): ct is AgreementFile => !!ct && ct.documentTypeId != null),
        take(1)
      );
      const docTypesReady$ = this.documentTypes$.pipe(
        filter((arr) => Array.isArray(arr) && arr.length > 0),
        take(1)
      );
      const posReady$ = this.agreements$.pipe(
        filter((arr) => Array.isArray(arr) && arr.length > 0),
        take(1)
      );

      console.log('⏳ waiting for record(with docTypeId) + docTypes + pos…');

      combineLatest([recordReady$, docTypesReady$, posReady$])
        .pipe(take(1))
        .subscribe({
          next: ([ct]) => {
            this.currentRecord = ct;

            // Coerce IDs to numbers to match optionValue="id"
            const agreementId =
              ct.agreementId != null ? Number(ct.agreementId) : null;
            const documentTypeId =
              ct.documentTypeId != null ? Number(ct.documentTypeId) : null;

            console.log('✅ ready; ids:', { agreementId, documentTypeId });

            // Patch core fields
            this.addAgreementFileForm.patchValue(
              {
                id: ct.id,
                agreementId,
                expiryDate: ct.expiryDate ? new Date(ct.expiryDate) : null,
                file: null,
              },
              { emitEvent: false }
            );

            // Set documentTypeId explicitly (options are present)
            const docCtrl = this.addAgreementFileForm.get('documentTypeId')!;
            docCtrl.setValue(documentTypeId, { emitEvent: false });
            docCtrl.updateValueAndValidity({ emitEvent: false });

            // 🔒 Disable document type in edit mode
            if (this.editMode) {
              docCtrl.disable({ emitEvent: false });
            }

            // Existing file info for child display
            this.existingFileName = ct.fileName ?? undefined;
            this.existingFileId = ct.fileId ?? undefined;
            this.existingFileUrl = ct.filePath ?? undefined;

            // Reset file validators for edit/view
            const fileCtrl = this.addAgreementFileForm.get('file')!;
            fileCtrl.setValue(null, { emitEvent: false });
            fileCtrl.clearValidators();
            fileCtrl.updateValueAndValidity({ emitEvent: false });

            if (this.viewOnly) {
              this.addAgreementFileForm.disable({ emitEvent: false });
            }

            this.cdr.detectChanges();
          },
          error: (e) => console.error('❌ combineLatest error:', e),
        });
    }

    // (Optional) quick status log
    this.addAgreementFileForm.statusChanges?.subscribe((s) => {
      console.log('🧭 form status:', s);
    });
  }

  addOrEditAgreementFile() {
    if (this.addAgreementFileForm.invalid) {
      this.addAgreementFileForm.markAllAsTouched();
      return;
    }

    const raw = this.addAgreementFileForm.getRawValue();

    const { id, agreementId, documentTypeId, expiryDate, file } = raw;
    const fileValue = this.addAgreementFileForm.get('file')?.value;
    const files: File[] = Array.isArray(fileValue)
      ? fileValue
      : fileValue
      ? [fileValue]
      : [];

    if (this.mode === 'add' && files.length === 0) {
      console.warn('No file selected.');
      // optionally show a toast here
      return;
    }

    const fd = new FormData();
    if (id != null) fd.append('id', String(id));
    fd.append('agreementId', String(agreementId));
    fd.append('documentTypeId', String(documentTypeId));
    fd.append('expiryDate', this.formatDateWithoutTime(expiryDate));
    for (const f of files) fd.append('file', f);

    if (this.mode === 'add') {
      this.facade.create(fd as any);
    } else if (this.mode === 'edit') {
      const body = {
        id,
        agreementId,
        documentTypeId,
        // expiryDate should be a Date object for update
        expiryDate:
          expiryDate instanceof Date ? expiryDate : new Date(expiryDate),
        fileId: this.currentRecord?.fileId ?? this.existingFileId,
      };
      this.facade.update(id!, body);
    }

    this.addAgreementFileForm.markAsPristine();

    // ✅ Always navigate using the purchase order id
    const targetPoId =
      this.mode === 'add'
        ? this.routeId // was seeded from route in add mode
        : agreementId ?? this.currentRecord?.agreementId;

    this.router.navigate([
      `/agreement/activities/view-agreement-files/${targetPoId}`,
    ]);
  }

  private formatDateWithoutTime(date: Date | string): string {
    const d = date instanceof Date ? date : new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  close() {
    console.log('Navigating back to view-purchasing-order-files');
    this.router.navigate([
      `/purchasing/purchasing-orders/activities/view-purchasing-order-files/${this.routeId}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addAgreementFileForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

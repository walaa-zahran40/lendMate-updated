import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, combineLatest, filter, map, take } from 'rxjs';
import { PurchasingOrderFilesFacade } from '../../../../../store/purchasing-order-files/purchasing-order-files.facade';
import { PurchaseOrderFile } from '../../../../../store/purchasing-order-files/purchasing-order-file.model';
import { PurchasingOrdersFacade } from '../../../../../store/purchasing-orders/purchasing-orders.facade';
import { PurchaseOrder } from '../../../../../store/purchasing-orders/purchasing-order.model';
import { DocTypesFacade } from '../../../../../../lookups/store/doc-types/doc-types.facade';
import { DocType } from '../../../../../../lookups/store/doc-types/doc-type.model';

@Component({
  selector: 'app-add-purchasing-orders-file',
  standalone: false,
  templateUrl: './add-purchasing-orders-file.component.html',
  styleUrl: './add-purchasing-orders-file.component.scss',
})
export class AddPurchasingOrdersFileComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addPurchasingOrderFileForm!: FormGroup;
  retrivedId: any;
  routeId: any;
  recordId!: number;
  purchaseOrders$!: Observable<PurchaseOrder[]>;
  documentTypes$!: Observable<DocType[]>;
  private destroy$ = new Subject<void>();
  currentRecord?: PurchaseOrderFile | null = null; // <— add this
  existingFileName?: string;
  existingFileId?: number;
  existingFileUrl?: string;
  record$!: Observable<PurchaseOrderFile | null>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PurchasingOrderFilesFacade,
    private facadePurchaseOrders: PurchasingOrdersFacade,
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
    this.facadePurchaseOrders.loadAll();
    this.purchaseOrders$ = this.facadePurchaseOrders.all$;

    this.facadeDocumentTypes.loadAll();
    this.documentTypes$ = this.facadeDocumentTypes.all$.pipe(
      map((list) => (list ?? []).map((d) => ({ ...d, id: Number(d.id) })))
    );

    // 3) Build form
    this.addPurchasingOrderFileForm = this.fb.group({
      id: [null],
      purchaseOrderId: [null, Validators.required],
      documentTypeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode || this.viewOnly ? [] : Validators.required],
    });

    // 4) Add mode: seed PO id and lock it
    const poCtrl = this.addPurchasingOrderFileForm.get('purchaseOrderId')!;
    if (this.mode === 'add') {
      poCtrl.setValue(this.routeId, { emitEvent: false });
      poCtrl.disable({ emitEvent: false });
      this.addPurchasingOrderFileForm.patchValue({
        purchaseOrderId: this.routeId,
      });
    } else if (this.viewOnly) {
      this.addPurchasingOrderFileForm.disable({ emitEvent: false });
    }

    // 5) Edit/View: load record and patch AFTER options are ready
    if (this.editMode || this.viewOnly) {
      console.log('📡 loading record by id:', this.recordId);
      this.facade.loadById(this.recordId);

      // Prefer a byId$ selector if available
      this.record$ = (this.facade as any).byId$
        ? (this.facade as any).byId$(this.recordId)
        : this.facade.all$.pipe(
            map((list) => list?.find((x) => x.id === this.recordId) ?? null)
          );

      // Gate until: record has documentTypeId, and options are loaded
      const recordReady$ = this.record$.pipe(
        filter(
          (ct): ct is PurchaseOrderFile => !!ct && ct.documentTypeId != null
        ),
        take(1)
      );
      const docTypesReady$ = this.documentTypes$.pipe(
        filter((arr) => Array.isArray(arr) && arr.length > 0),
        take(1)
      );
      const posReady$ = this.purchaseOrders$.pipe(
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
            const purchaseOrderId =
              ct.purchaseOrderId != null ? Number(ct.purchaseOrderId) : null;
            const documentTypeId =
              ct.documentTypeId != null ? Number(ct.documentTypeId) : null;

            console.log('✅ ready; ids:', { purchaseOrderId, documentTypeId });

            // Patch core fields
            this.addPurchasingOrderFileForm.patchValue(
              {
                id: ct.id,
                purchaseOrderId,
                expiryDate: ct.expiryDate ? new Date(ct.expiryDate) : null,
                file: null,
              },
              { emitEvent: false }
            );

            // Set documentTypeId explicitly (options are present)
            const docCtrl =
              this.addPurchasingOrderFileForm.get('documentTypeId')!;
            docCtrl.setValue(documentTypeId, { emitEvent: false });
            docCtrl.updateValueAndValidity({ emitEvent: false });

            // Existing file info for child display
            this.existingFileName = ct.fileName ?? undefined;
            this.existingFileId = ct.fileId ?? undefined;
            this.existingFileUrl = ct.filePath ?? undefined;

            // Reset file validators for edit/view
            const fileCtrl = this.addPurchasingOrderFileForm.get('file')!;
            fileCtrl.setValue(null, { emitEvent: false });
            fileCtrl.clearValidators();
            fileCtrl.updateValueAndValidity({ emitEvent: false });

            if (this.viewOnly) {
              this.addPurchasingOrderFileForm.disable({ emitEvent: false });
            }

            this.cdr.detectChanges();
          },
          error: (e) => console.error('❌ combineLatest error:', e),
        });
    }

    // (Optional) quick status log
    this.addPurchasingOrderFileForm.statusChanges?.subscribe((s) => {
      console.log('🧭 form status:', s);
    });
  }

  addOrEditPurchasingOrderFile() {
    if (this.addPurchasingOrderFileForm.invalid) {
      this.addPurchasingOrderFileForm.markAllAsTouched();
      return;
    }

    const raw = this.addPurchasingOrderFileForm.getRawValue();

    const { id, purchaseOrderId, documentTypeId, expiryDate, file } = raw;
    const fileValue = this.addPurchasingOrderFileForm.get('file')?.value;
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
    fd.append('purchaseOrderId', String(purchaseOrderId));
    fd.append('documentTypeId', String(documentTypeId));
    fd.append('expiryDate', this.formatDateWithoutTime(expiryDate));
    for (const f of files) fd.append('file', f);

    if (this.mode === 'add') {
      this.facade.create(fd as any);
    } else if (this.mode === 'edit') {
      const body = {
        id,
        purchaseOrderId,
        documentTypeId,
        // expiryDate should be a Date object for update
        expiryDate:
          expiryDate instanceof Date ? expiryDate : new Date(expiryDate),
        fileId: this.currentRecord?.fileId ?? this.existingFileId,
      };
      this.facade.update(id!, body);
    }

    this.addPurchasingOrderFileForm.markAsPristine();

    // ✅ Always navigate using the purchase order id
    const targetPoId =
      this.mode === 'add'
        ? this.routeId // was seeded from route in add mode
        : purchaseOrderId ?? this.currentRecord?.purchaseOrderId;

    this.router.navigate([
      `/purchasing/purchasing-orders/activities/view-purchasing-order-files/${targetPoId}`,
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
    return !this.addPurchasingOrderFileForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

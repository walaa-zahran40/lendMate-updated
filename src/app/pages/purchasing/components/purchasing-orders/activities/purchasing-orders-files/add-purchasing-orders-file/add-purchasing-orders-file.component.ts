import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, filter, take } from 'rxjs';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PurchasingOrderFilesFacade,
    private facadePurchaseOrders: PurchasingOrdersFacade,
    private facadeDocumentTypes: DocTypesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.routeId = Number(this.route.snapshot.params['id']);
    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';

    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    const routeParamId = Number(this.route.snapshot.params['id']);

    if (this.editMode || this.viewOnly) {
      this.recordId = routeParamId; // file id
    } else {
      this.routeId = routeParamId; // purchase order id for add
    }

    console.log('🔍 Params:', {
      routeId: this.routeId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });
    this.facadePurchaseOrders.loadAll();
    this.purchaseOrders$ = this.facadePurchaseOrders.all$;
    this.facadeDocumentTypes.loadAll();
    this.documentTypes$ = this.facadeDocumentTypes.all$;

    // 5️⃣ Build the form
    this.addPurchasingOrderFileForm = this.fb.group({
      id: [null],
      purchaseOrderId: [null, Validators.required],
      documentTypeId: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [[], this.editMode || this.viewOnly ? [] : Validators.required],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addPurchasingOrderFileForm.value
    );
    // after building the form:
    const poCtrl = this.addPurchasingOrderFileForm.get('purchaseOrderId')!;

    if (this.mode === 'add') {
      poCtrl.setValue(this.routeId, { emitEvent: false });
      poCtrl.disable({ emitEvent: false }); // <- enforce disabled
    } else if (this.viewOnly) {
      this.addPurchasingOrderFileForm.disable({ emitEvent: false });
    }

    // 6️⃣ If add mode, seed routeId
    if (this.mode === 'add') {
      this.addPurchasingOrderFileForm.patchValue({
        purchaseOrderId: this.routeId,
      });
      console.log('✏️ Add mode → patched routeId:', this.routeId);
    }
    // 8️⃣ If editing or viewing, load & patch
    if (this.editMode || this.viewOnly) {
      this.facade.loadById(this.recordId);

      this.facade.selected$
        .pipe(
          filter(
            (ct): ct is PurchaseOrderFile => !!ct && ct.id === this.recordId
          ),
          take(1)
        )
        .subscribe((ct) => {
          this.currentRecord = ct; // keep a ref for submit

          this.addPurchasingOrderFileForm.patchValue({
            id: ct.id,
            purchaseOrderId: ct.purchaseOrderId, // <-- from entity
            documentTypeId: ct.documentTypeId,
            expiryDate: ct.expiryDate ? new Date(ct.expiryDate) : null,
          });
          this.existingFileName = ct.fileName;
          this.existingFileId = ct.fileId; // if you have a download endpoint, build a URL from this
          this.existingFileUrl = ct.filePath;

          // In edit/view, do NOT force file selection
          const fileCtrl = this.addPurchasingOrderFileForm.get('file')!;
          fileCtrl.clearValidators();
          fileCtrl.updateValueAndValidity({ emitEvent: false });

          if (this.viewOnly)
            this.addPurchasingOrderFileForm.disable({ emitEvent: false });
        });
    } else if (this.viewOnly) {
      // ADD mode: seed the purchaseOrderId from route
      this.addPurchasingOrderFileForm.patchValue({
        purchaseOrderId: this.routeId,
      });
      // keep it disabled in add if you want it read-only
      this.addPurchasingOrderFileForm
        .get('purchaseOrderId')
        ?.disable({ emitEvent: false });
    }
  }

  addOrEditPurchasingOrderFile() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.addPurchasingOrderFileForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPurchasingOrderFileForm.markAllAsTouched();
      return;
    }

    // Use rawValue because purchaseOrderId is disabled in add-mode
    const raw = this.addPurchasingOrderFileForm.getRawValue();
    const { id, purchaseOrderId, documentTypeId, expiryDate } = raw;
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
    if (documentTypeId != null)
      fd.append('documentTypeId', String(documentTypeId));
    fd.append('expiryDate', this.formatDateWithoutTime(expiryDate));
    for (const f of files) fd.append('file', f);
    if (
      this.editMode &&
      files.length === 0 &&
      this.currentRecord?.fileId != null
    ) {
      fd.append('fileId', String(this.currentRecord.fileId));
    }

    if (this.mode === 'add') {
      this.facade.create(fd as any);
    } else {
      this.facade.update(id!, fd as any);
    }

    this.addPurchasingOrderFileForm.markAsPristine();
    this.router.navigate([
      `/purchasing/purchasing-orders/activities/view-purchasing-order-files/${routeId}`,
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

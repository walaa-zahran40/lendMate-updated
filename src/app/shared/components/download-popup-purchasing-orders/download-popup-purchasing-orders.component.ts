import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PurchaseOrder } from '../../../pages/purchasing/store/purchasing-orders/purchasing-order.model';
import { PurchaseOrderPrintOutService } from '../../../pages/purchasing/store/purchase-order-printout/purchase-order-printout.service';

@Component({
  selector: 'app-download-popup-purchasing-orders',
  standalone: false,
  templateUrl: './download-popup-purchasing-orders.component.html',
  styleUrl: './download-popup-purchasing-orders.component.scss',
})
export class DownloadPopupPurchasingOrdersComponent {
  @Input() purchasingOrders!: any[];
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<PurchaseOrder>();
  @Input() purchaseOrders!: any;
  optionLabelKey = 'name';
  @Input() purchaseOrderId!: number; // 👈 added
  @Input() purchaseOrderNumber?: string; // 👈 optional, for filename
  loading = false;

  constructor(
    private fb: FormBuilder,
    private purchaseOrderPrintOutService: PurchaseOrderPrintOutService,
    private translate: TranslateService
  ) {
    this.setOptionLabelKey(this.translate.currentLang);

    this.translate.onLangChange.subscribe((event) => {
      this.setOptionLabelKey(event.lang);
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onDownload(): void {
    const id = this.purchaseOrderId;
    if (!id) return;

    this.loading = true;
    this.purchaseOrderPrintOutService
      .printOutInWordFormatByLang(id, this.translate.currentLang)
      .subscribe({
        next: (res) => {
          const contentType =
            res.headers.get('Content-Type') ||
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

          // Try to read filename from Content-Disposition; fallback to a friendly name.
          const cd = res.headers.get('Content-Disposition') || '';
          const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(cd);
          const serverName = match?.[1]?.replace(/['"]/g, '');
          const safeNumber = this.purchaseOrderNumber
            ?.toString()
            .replace(/[^\w\-]/g, '_');
          const fallbackName = safeNumber
            ? `PurchaseOrder_${safeNumber}.docx`
            : `PurchaseOrder_${id}.docx`;
          const filename = serverName || fallbackName;

          const blob = new Blob([res.body!], { type: contentType });
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          this.loading = false;
          this.onClose();
        },
        error: (err) => {
          console.error('Error downloading DOCX:', err?.error?.message || err);
          this.loading = false;
        },
      });
  }

  private setOptionLabelKey(lang: string) {
    this.optionLabelKey = lang === 'ar' ? 'nameAR' : 'name';
  }
}

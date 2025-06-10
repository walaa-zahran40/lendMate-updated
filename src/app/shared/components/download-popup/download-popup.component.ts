import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MandatePrintOutService } from '../../../pages/crm/leasing-mandates/store/mandate-printout/mandate-printout.service';
import { Mandate } from '../../../pages/crm/leasing-mandates/store/leasing-mandates/leasing-mandate.model';

@Component({
  selector: 'app-download-popup',
  standalone: false,
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss'],
})
export class DownloadPopupComponent {
  @Input() leasingMandates!: any[];
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<Mandate>();
  @Input() contactPersons!: any;
  @Input() officers!: any;
  downloadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mandatePrintOutService: MandatePrintOutService
  ) {
    this.downloadForm = this.fb.group({
      contactPersons: [null],
      officers: [null],
    });
  }

  onClose(): void {
    this.close.emit();
  }

  onDownload(): void {
    const { contactPersons, officers } = this.downloadForm.value;
    if (!officers || !contactPersons) {
      console.warn('Please fill all the required fields');
      return;
    }
    console.log('leasing mandates', this.leasingMandates);
    const mandate: Mandate = { contactPersons, officers } as any;
    this.download.emit(mandate);

    const leasingMandateId = this.leasingMandates[0]?.id;
    if (!leasingMandateId) {
      console.error('No mandate selected for download');
      return;
    }

    this.mandatePrintOutService
      .printOutInPdfFormat(leasingMandateId, officers, contactPersons)
      .subscribe(
        (pdfBlob: Blob) => {
          const url = window.URL.createObjectURL(
            new Blob([pdfBlob], { type: 'application/pdf' })
          );

          const link = document.createElement('a');
          link.href = url;
          link.download = `LeasingMandate_${leasingMandateId}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error(
            'Error downloading PDF:',
            error?.error?.message || error
          );
        }
      );
  }
}

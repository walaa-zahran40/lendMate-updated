import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MandatePrintOutService } from '../../../pages/crm/leasing-mandates/store/mandate-printout/mandate-printout.service';
import { Mandate } from '../../../pages/crm/leasing-mandates/store/leasing-mandates/leasing-mandate.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-download-popup-mandate',
  standalone: false,
  templateUrl: './download-popup-mandate.component.html',
  styleUrls: ['./download-popup-mandate.component.scss'],
})
export class DownloadPopupMandateComponent {
  @Input() leasingMandates!: any[];
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<Mandate>();
  @Input() contactPersons!: any;
  @Input() officers!: any;
  downloadForm: FormGroup;
  optionLabelKey = 'name';

  constructor(
    private fb: FormBuilder,
    private mandatePrintOutService: MandatePrintOutService,
    private translate: TranslateService
  ) {
    this.downloadForm = this.fb.group({
      contactPersons: [null],
      officers: [null],
    });
    this.setOptionLabelKey(this.translate.currentLang);

    this.translate.onLangChange.subscribe((event) => {
      this.setOptionLabelKey(event.lang);
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
      .printOutInPdfFormatByLang(
        leasingMandateId,
        this.translate.currentLang,
        officers,
        contactPersons
      )
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
  private setOptionLabelKey(lang: string) {
    this.optionLabelKey = lang === 'ar' ? 'nameAR' : 'name';
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mandate } from '../../../pages/crm/leasing-mandates/store/leasing-mandates/leasing-mandate.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-download-popup',
  standalone: false,
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss'],
})
export class DownloadPopupComponent {
  @Input() contactPersons: any;
  @Input() officers: any;
  @Input() languages: any;
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<Mandate>();
  downloadForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.downloadForm = this.fb.group({
      contactPersons: [null],
      officers: [null],
      languages: [null],
    });
  }
  onClose(): void {
    this.close.emit();
  }

  onDownload(): void {
    const mandate: Mandate = {
      contactPersons: this.contactPersons,
      officers: this.officers,
      languages: this.languages,
    } as Mandate;
    this.download.emit(mandate);
  }
}

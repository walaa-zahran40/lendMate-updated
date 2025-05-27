import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mandate } from '../../../pages/crm/leasing-mandates/store/leasing-mandates/leasing-mandate.model';

@Component({
  selector: 'app-download-popup',
  standalone: false,
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss'],
})
export class DownloadPopupComponent {
  @Input() mandate: any;
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<Mandate>();

  onClose(): void {
    this.close.emit();
  }

  onDownload(): void {
    this.download.emit(this.mandate);
  }
}

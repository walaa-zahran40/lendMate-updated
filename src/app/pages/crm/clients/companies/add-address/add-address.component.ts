import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-add-address',
  standalone: false,
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss',
})
export class AddAddressComponent {
  constructor(private messageService: MessageService) {}

  addDocument() {
    console.log('added');
  }
  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }
}

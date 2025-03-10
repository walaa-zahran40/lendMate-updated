import { Component } from '@angular/core';
import { Upload } from '../../../../shared/interfaces/upload-documents.interface';

@Component({
  selector: 'app-view-upload-documents',
  standalone: false,
  templateUrl: './view-upload-documents.component.html',
  styleUrl: './view-upload-documents.component.scss',
})
export class ViewUploadDocumentsComponent {
  tableDataInside: Upload[] = [];
  colsInside: any[] = [];
  ngOnInit() {
    this.colsInside = [
      { field: 'documentName', header: 'Document Name' },
      { field: 'documentType', header: 'Document Type' },
      { field: 'expiryDate', header: 'Expiry Date' },
    ];
    this.tableDataInside = [
      {
        documentName: 'Document Name',
        documentType: 'PDF',
        expiryDate: new Date('10/10/2024'),
      },
      {
        documentName: 'Document Name',
        documentType: 'Word',
        expiryDate: new Date('10/10/2024'),
      },
      {
        documentName: 'Document Name',
        documentType: 'Excel',
        expiryDate: new Date('10/10/2024'),
      },
      {
        documentName: 'Document Name',
        documentType: 'PDF',
        expiryDate: new Date('10/10/2024'),
      },
      {
        documentName: 'Document Name',
        documentType: 'Excel',
        expiryDate: new Date('10/10/2024'),
      },
      {
        documentName: 'Document Name',
        documentType: 'Word',
        expiryDate: new Date('10/10/2024'),
      },
    ];
  }
}

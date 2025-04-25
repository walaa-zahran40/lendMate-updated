import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientFileFacade } from '../../store/client-file/client-file.facade';
import { filter, take } from 'rxjs';
import { DocumentTypeFacade } from '../../store/document-type/document-type.facade';

@Component({
  selector: 'app-upload-documents',
  standalone: false,
  templateUrl: './upload-documents.component.html',
  styleUrl: './upload-documents.component.scss',
})
export class UploadDocumentsComponent implements OnInit {
  clientId!: number;
  selectedFile!: File;
  selectedDocuments: any[] = [];
  expiryDate!: Date;
  documentId!: number | null;
  editMode: boolean = false;
  uploadForm!: FormGroup;
  documentTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientFileFacade,
    private router: Router,
    private facadeDocumentTypes: DocumentTypeFacade,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log('[Route Snapshot] Full Params:', this.route.snapshot.paramMap);

    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;
    const fileIdParam = this.route.snapshot.paramMap.get('documentId');
    this.documentId = fileIdParam ? +fileIdParam : null;
    this.editMode = !!this.documentId;

    console.log('[Init] clientId:', this.clientId);
    console.log('[Init] documentId:', this.documentId);
    console.log('[Init] editMode:', this.editMode);

    this.uploadForm = this.fb.group({
      documentTypeIds: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode ? [] : Validators.required],
    });

    this.facadeDocumentTypes.loadDocumentTypes();
    this.facadeDocumentTypes.documentTypes$.subscribe((items) => {
      console.log(
        '[UploadDocumentsComponent] Document types from store:',
        items
      );
      this.documentTypes = items;
    });

    if (this.editMode) {
      this.facade.loadClientFileById(this.documentId!); // ✅ correct call

      this.facade.selectedDocument$
        .pipe(
          filter((doc) => !!doc),
          take(1)
        )
        .subscribe((doc) => {
          this.uploadForm.patchValue({
            documentTypeIds: doc.documentTypeId,
            expiryDate: new Date(doc.expiryDate),
          });
          this.selectedFile = { name: doc.fileName } as File;
        });
    }
  }

  onFileSelected(event: any) {
    let file: File | undefined;

    // If it's PrimeNG p-fileupload (advanced mode), they pass { files: File[] }
    if (event.files && Array.isArray(event.files)) {
      file = event.files[0];
    }
    // If it's a native <input type="file">, they pass a DOM Event
    else if (event.target && event.target.files) {
      file = event.target.files[0];
    }

    if (file) {
      this.uploadForm.get('file')!.setValue(file);
    }
  }

  addDocument() {
    console.log('Entered addDocument method');

    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    const { documentTypeIds, expiryDate, file } = this.uploadForm.value;
    console.log('Form values:', { documentTypeIds, expiryDate, file });

    const formData = new FormData();
    formData.append('clientId', this.clientId.toString());
    formData.append('expiryDate', (expiryDate as Date).toISOString());

    const docTypeId =
      typeof documentTypeIds === 'object'
        ? documentTypeIds.id
        : documentTypeIds;
    formData.append('documentTypeId', docTypeId.toString());

    if (file) {
      formData.append('file', file);
    } else if (!this.editMode) {
      console.error('No file selected for upload.');
      return;
    }

    console.log('Calling facade upload or update...');
    if (this.editMode) {
      this.facade.updateClientFile(this.documentId!, formData, this.clientId);
      this.messageService.add({
        severity: 'success',
        summary: 'Uploaded',
        detail: 'Document uploaded successfully',
      });

      this.router.navigate(['/crm/clients/view-upload-documents'], {
        queryParams: { id: this.clientId },
      });
    } else {
      this.facade.uploadClientFile(formData, this.clientId);
      this.messageService.add({
        severity: 'success',
        summary: 'Uploaded',
        detail: 'Document uploaded successfully',
      });

      this.router.navigate(['/crm/clients/view-upload-documents'], {
        queryParams: { id: this.clientId },
      });
    }
  }
}

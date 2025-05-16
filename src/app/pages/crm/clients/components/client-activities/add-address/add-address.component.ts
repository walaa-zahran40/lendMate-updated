import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, take } from 'rxjs';
import { ClientFileFacade } from '../../../store/client-file/client-file.facade';
import { DocumentTypeFacade } from '../../../store/document-type/document-type.facade';

@Component({
  selector: 'app-add-address',
  standalone: false,
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss',
})
export class AddAddressComponent {
  clientId!: number;
  selectedFile!: File;
  selectedDocuments: any[] = [];
  expiryDate!: Date;
  documentId!: number | null;
  editMode: boolean = false;
  addAddressForm!: FormGroup;
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

    this.addAddressForm = this.fb.group({
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
    this.addAddressForm.get('documentTypeIds')?.enable();

    if (this.editMode) {
      this.facade.loadClientFileById(this.documentId!); // ✅ correct call
      this.addAddressForm.get('documentTypeIds')?.disable();

      this.facade.selectedDocument$
        .pipe(
          filter((doc) => !!doc),
          take(1)
        )
        .subscribe((doc) => {
          this.addAddressForm.patchValue({
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
      this.addAddressForm.get('file')!.setValue(file);
    }
  }

  addAddress() {
    console.log('Entered addDocument method');

    if (this.addAddressForm.invalid) {
      this.addAddressForm.markAllAsTouched();
      return;
    }
    this.addAddressForm.get('documentTypeIds')?.enable();

    const { documentTypeIds, expiryDate, file } = this.addAddressForm.value;
    console.log('Form values:', { documentTypeIds, expiryDate, file });

    // Normalize the documentTypeId field
    const docTypeId =
      typeof documentTypeIds === 'object'
        ? documentTypeIds.id
        : documentTypeIds;

    if (this.editMode) {
      // 🎯 EDIT MODE: Send JSON body, not FormData
      this.addAddressForm.get('documentTypeIds')?.disable();
      const updatePayload = {
        id: this.documentId!, // required
        clientId: this.clientId, // required
        fileId: docTypeId, // map documentTypeIds -> fileId
        expiryDate: this.formatDateWithoutTime(expiryDate),
      };

      console.log('[Edit Mode] Sending update payload:', updatePayload);

      this.facade.updateClientFile(this.documentId!, updatePayload);

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Document updated successfully',
      });

      this.router.navigate(['/crm/clients/view-upload-documents'], {
        queryParams: { id: this.clientId },
      });
    } else {
      // 🎯 ADD MODE: Upload new file with FormData
      if (!file) {
        console.error('No file selected for upload.');
        return;
      }

      const formData = new FormData();
      formData.append('clientId', this.clientId.toString());
      formData.append('expiryDate', this.formatDateWithoutTime(expiryDate));
      formData.append('documentTypeId', docTypeId.toString());
      formData.append('file', file);

      console.log('[Add Mode] Sending FormData upload...');

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
  private formatDateWithoutTime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

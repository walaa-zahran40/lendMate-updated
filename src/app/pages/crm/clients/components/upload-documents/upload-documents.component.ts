import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientFileFacade } from '../../store/client-file/client-file.facade';
import { filter, take } from 'rxjs';

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
  uploadForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientFileFacade,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;
    this.uploadForm = this.fb.group({
      documentTypeIds: [[], Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, Validators.required],
    });
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
    console.log('entered');
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    const { documentTypeIds, expiryDate, file } = this.uploadForm.value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', this.clientId.toString());
    formData.append('expiryDate', (expiryDate as Date).toISOString());
    documentTypeIds.forEach((id: { toString: () => string | Blob }) =>
      formData.append('documentTypeIds', id.toString())
    );

    this.facade.uploadClientFile(formData, this.clientId);

    this.facade.uploading$
      .pipe(
        filter((u) => !u),
        take(1)
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Uploaded',
          detail: 'Document uploaded successfully',
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}

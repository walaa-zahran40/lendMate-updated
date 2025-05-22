import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, tap, filter, take } from 'rxjs';
import { DocTypesFacade } from '../../../../../../../../lookups/store/doc-types/doc-types.facade';
import { ClientFile } from '../../../../../../store/client-file/client-file.model';
import { ClientFilesFacade } from '../../../../../../store/client-file/client-files.facade';

@Component({
  selector: 'app-add-upload-documents',
  standalone: false,
  templateUrl: './add-upload-documents.component.html',
  styleUrl: './add-upload-documents.component.scss',
})
export class AddUploadDocumentsComponent implements OnInit {
  clientId!: number;
  selectedFile!: File;
  selectedDocuments: any[] = [];
  expiryDate!: Date;
  documentId!: number | null;
  editMode: boolean = false;
  viewMode: boolean = false;
  uploadForm!: FormGroup;
  documentTypes: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientFilesFacade,
    private router: Router,
    private facadeDocumentTypes: DocTypesFacade,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log('[Route Snapshot] Full Params:', this.route.snapshot.paramMap);

    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;
    const fileIdParam = this.route.snapshot.paramMap.get('documentId');
    this.documentId = fileIdParam ? +fileIdParam : null;
    this.editMode = !!this.documentId;
    // NEW: detect ?mode=view
    const mode = this.route.snapshot.queryParamMap.get('mode');
    this.viewMode = mode === 'view';
    this.editMode = !!this.documentId && !this.viewMode;

    console.log('[Init] viewMode=', this.viewMode, 'editMode=', this.editMode);
    console.log('[Init] clientId:', this.clientId);
    console.log('[Init] documentId:', this.documentId);
    console.log('[Init] editMode:', this.editMode);

    this.uploadForm = this.fb.group({
      documentTypeIds: [null, Validators.required],
      expiryDate: [null, Validators.required],
      file: [null, this.editMode || this.viewMode ? [] : Validators.required],
    });
    console.log('[Init] Route Snapshot params:', this.route.snapshot.params);
    console.log(
      '[Init] Route Snapshot queryParams:',
      this.route.snapshot.queryParams
    );

    console.log('[Init] Dispatching loadDocumentTypes()');

    this.facadeDocumentTypes.loadAll();
    this.facadeDocumentTypes.all$
      .pipe(takeUntil(this.destroy$))
      .subscribe((types) => {
        console.log(
          '[UploadDocumentsComponent] documentTypes$ emitted:',
          types
        );
        this.documentTypes = types;
      });
    this.uploadForm.get('documentTypeIds')?.enable();

    if (this.editMode || this.viewMode) {
      console.log('doc', this.documentId);
      this.facade.loadOne(this.documentId!); // ✅ correct call
      this.uploadForm.get('documentTypeIds')?.disable();

      console.log(
        '[Init] about to subscribe to facade.current$ for clientId=',
        this.clientId
      );
      this.facade.current$
        .pipe(
          tap((c) => console.log('[current$] raw emission →', c)),
          filter((c): c is ClientFile => {
            const pass = !!c && c.id === this.documentId;
            console.log(
              `[current$] filtering: c?.id=${c?.id}  === documentId? → ${pass}`
            );
            return pass;
          }),
          take(1)
        )
        .subscribe({
          next: (doc) => {
            console.log('[current$ subscribe] received doc →', doc);
            this.uploadForm.patchValue({
              documentTypeIds: doc.documentTypeId,
              expiryDate: new Date(doc.expiryDate),
            });
            console.log('[current$ subscribe] patched form with', {
              documentTypeId: doc.documentTypeId,
              expiryDate: doc.expiryDate,
            });

            this.selectedFile = { name: doc.fileName } as File;
            console.log(
              '[current$ subscribe] selectedFile set to →',
              this.selectedFile
            );
            if (this.viewMode) {
              console.log('[Init] viewMode active, disabling form');
              this.uploadForm.disable({ emitEvent: false });
            }
          },
          error: (err) => console.error('[current$ subscribe] error →', err),
          complete: () => console.log('[current$ subscribe] complete'),
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
    if (this.viewMode) {
      console.warn('AddDocument called in viewMode – no action taken');
      return;
    }
    console.log('Entered addDocument method');

    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }
    this.uploadForm.get('documentTypeIds')?.enable();

    const { documentTypeIds, expiryDate, file } = this.uploadForm.value;
    console.log('Form values:', { documentTypeIds, expiryDate, file });

    // Normalize the documentTypeId field
    const docTypeId =
      typeof documentTypeIds === 'object'
        ? documentTypeIds.id
        : documentTypeIds;

    if (this.editMode || this.viewMode) {
      // 🎯 EDIT MODE: Send JSON body, not FormData
      this.uploadForm.get('documentTypeIds')?.disable();
      const updatePayload = {
        id: this.documentId!, // required
        clientId: this.clientId, // required
        fileId: docTypeId, // map documentTypeIds -> fileId
        expiryDate: this.formatDateWithoutTime(expiryDate),
      };

      console.log('[Edit Mode] Sending update payload:', updatePayload);

      this.facade.update(this.documentId!, updatePayload);

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Document updated successfully',
      });

      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.clientId}`],
        {
          queryParams: { id: this.clientId },
        }
      );
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

      // If facade.create only accepts Partial<ClientFile>, convert FormData to object:
      // const payload: Partial<ClientFile> = {
      //   clientId: this.clientId,
      //   expiryDate: this.formatDateWithoutTime(expiryDate),
      //   documentTypeId: docTypeId,
      //   file: file
      // };
      // this.facade.create(payload);

      // If facade.create can be updated to accept FormData, update its type signature.
      this.facade.create(formData as any);

      this.messageService.add({
        severity: 'success',
        summary: 'Uploaded',
        detail: 'Document uploaded successfully',
      });

      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.clientId}`],
        {
          queryParams: { id: this.clientId },
        }
      );
    }
  }
  private formatDateWithoutTime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

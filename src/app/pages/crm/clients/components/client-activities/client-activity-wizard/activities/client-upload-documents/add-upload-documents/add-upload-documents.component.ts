import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, tap, filter, take, Observable } from 'rxjs';
import { DocTypesFacade } from '../../../../../../../../lookups/store/doc-types/doc-types.facade';
import { ClientFile } from '../../../../../../store/client-file/client-file.model';
import { ClientFilesFacade } from '../../../../../../store/client-file/client-files.facade';
import { ClientFilesService } from '../../../../../../store/client-file/client-files.service';
import { environment } from '../../../../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
  preview: any;
  documentId!: number | null;
  editMode: boolean = false;
  viewMode: boolean = false;
  uploadForm!: FormGroup;
  documentTypes: any[] = [];
  private destroy$ = new Subject<void>();
  previewUrl?: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientFilesFacade,
    private router: Router,
    private facadeDocumentTypes: DocTypesFacade,
    private messageService: MessageService,
    private http: HttpClient
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
            const hex = this.encodePathToHex(doc.filePath);
            console.log('hex', hex);
            console.log('[current$ subscribe] received doc →', doc);
            this.uploadForm.patchValue({
              documentTypeIds: doc.documentTypeId,
              expiryDate: new Date(doc.expiryDate),
            });
            console.log('[current$ subscribe] patched form with', {
              documentTypeId: doc.documentTypeId,
              expiryDate: doc.expiryDate,
            });

            this.selectedFile = doc as any;
            // 2) compute a “public” URL for preview:
            const rawPath = doc.filePath?.replace(/\\/g, '/'); // normalize slashes
            const relative = rawPath?.replace(/^[A-Za-z]:/, ''); // strip drive letter
            const full = `${environment.redirectUri}${relative}`;
            // 4) encode spaces etc
            this.previewUrl = encodeURI(full);

            console.log('preview Url', this.previewUrl);
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
    console.log('preee', this.previewUrl);
  }
  encodePathToHex(path: string | undefined | null): string {
    if (!path) {
      console.warn('[encodePathToHex] Input path is empty or undefined');
      return '';
    }

    return Array.from(path)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

  // downloadFile(preview = false) {
  //   this.preview = true;
  //   // 1) normalize slashes
  //   const rawPath = (this.selectedFile as any).filePath;
  //   const normalized = rawPath.replace(/\\/g, '/');
  //   console.log('normalized:', normalized);

  //   // 2) strip drive letter (anything before the first colon)
  //   //    -> "/uploads/Clients-2034/Identity/…"
  //   const relativePath = normalized.replace(/^[A-Za-z]:/, '');

  //   // 3) build the real URL your server exposes
  //   //    adjust `environment.fileServerUrl` (or hardcode) to match your API/static-hosting
  //   const fileUrl = `${environment.apiUrl2}${relativePath}`;
  //   console.log('fileUrl:', fileUrl);

  //   // 4) fetch it (or open directly)
  //   this.http.get(fileUrl, { responseType: 'blob' }).subscribe({
  //     next: (blob) => {
  //       const blobUrl = window.URL.createObjectURL(blob);

  //       console.log('preview');
  //       // show it in an <img>
  //       this.previewUrl = blobUrl;
  //       console.log('prev', this.previewUrl);
  //       const filename = (this.selectedFile as any).fileName;
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: (err) => {
  //       console.error('Download failed', err);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Download error',
  //         detail: 'Could not download the document.',
  //       });
  //     },
  //   });
  // }

  onFileSelected(file: File | null) {
    // clear old preview
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;

    if (!file) {
      this.uploadForm.get('file')!.reset();
      return;
    }

    this.uploadForm.get('file')!.setValue(file);
    this.previewUrl = URL.createObjectURL(file);
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

    if (this.editMode) {
      // 🆕 in edit mode, if there's a fresh File, send it in a FormData
      if (file instanceof File) {
        const formData = new FormData();
        formData.append('id', this.documentId!.toString());
        formData.append('clientId', this.clientId.toString());
        formData.append('documentTypeId', docTypeId.toString());
        formData.append('expiryDate', this.formatDateWithoutTime(expiryDate));
        formData.append('file', file);

        // assume you add this service/facade method:
        this.facade.update(this.documentId!, formData);
      } else {
        // no file chosen — fall back to JSON-only update
        const updatePayload = {
          id: this.documentId!,
          clientId: this.clientId,
          fileId: docTypeId,
          expiryDate: this.formatDateWithoutTime(expiryDate),
        };
        this.facade.update(this.documentId!, updatePayload);
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Document updated successfully',
      });
      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.clientId}`],
        { queryParams: { id: this.clientId } }
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
      if (this.uploadForm.valid) {
        this.uploadForm.markAsPristine();
      }

      this.router.navigate(
        [`/crm/clients/view-upload-documents/${this.clientId}`],
        {
          queryParams: { id: this.clientId },
        }
      );
    }
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.uploadForm.dirty;
  }
  onFileRemoved(event: any) {
    this.uploadForm.get('file')!.reset();
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = undefined;
    }
  }
  private formatDateWithoutTime(date: Date): string {
    const d = date instanceof Date ? date : new Date(date);

    if (isNaN(d.getTime())) {
      throw new Error(`Invalid date passed to formatDateWithoutTime: ${date}`);
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

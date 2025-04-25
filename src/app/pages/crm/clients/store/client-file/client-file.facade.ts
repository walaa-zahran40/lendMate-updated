import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClientFileActions from './client-file.actions';
import * as ClientFileSelectors from './client-file.selectors';
import { Observable } from 'rxjs';
import { Document } from '../../../../../shared/interfaces/document.interface';
import { selectSelectedDocument } from './client-file.selectors';

@Injectable({ providedIn: 'root' })
export class ClientFileFacade {
  documents$: Observable<Document[]> = this.store.select(
    ClientFileSelectors.selectDocuments
  );
  loading$: Observable<boolean> = this.store.select(
    ClientFileSelectors.selectLoading
  );
  uploading$: Observable<boolean> = this.store.select(
    ClientFileSelectors.selectUploading
  );
  deleting$: Observable<boolean> = this.store.select(
    ClientFileSelectors.selectDeleting
  );
  error$: Observable<any> = this.store.select(ClientFileSelectors.selectError);
  clientFile$ = this.store.select(selectSelectedDocument);
  selectedDocument$ = this.store.select(
    ClientFileSelectors.selectSelectedDocument
  );

  constructor(private store: Store) {}

  loadClientFiles(): void {
    this.store.dispatch(ClientFileActions.loadClientFiles());
  }

  loadClientFileById(id: number) {
    this.store.dispatch(ClientFileActions.loadClientFileById({ id }));
  }
  loadClientFilesByClientId(clientId: number): void {
    this.store.dispatch(
      ClientFileActions.loadClientFilesByClientId({ clientId })
    );
  }

  deleteClientFile(id: number, clientId: number): void {
    this.store.dispatch(ClientFileActions.deleteClientFile({ id, clientId }));
  }
  uploadClientFile(formData: FormData, clientId: number) {
    this.store.dispatch(
      ClientFileActions.uploadClientFile({ formData, clientId })
    );
  }

  updateClientFile(id: number, formData: FormData, clientId: number) {
    this.store.dispatch(
      ClientFileActions.updateClientFile({ id, formData, clientId })
    );
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClientFileActions from './client-file.actions';
import * as ClientFileSelectors from './client-file.selectors';
import { Observable } from 'rxjs';
import { Document } from '../../../../../shared/interfaces/document.interface';

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

  constructor(private store: Store) {}

  loadClientFiles(): void {
    this.store.dispatch(ClientFileActions.loadClientFiles());
  }
  loadClientFilesByClientId(clientId: number): void {
    this.store.dispatch(
      ClientFileActions.loadClientFilesByClientId({ clientId })
    );
  }

  uploadClientFile(formData: FormData, clientId: number): void {
    this.store.dispatch(
      ClientFileActions.uploadClientFile({ formData, clientId })
    );
  }
  deleteClientFile(id: number, clientId: number): void {
    this.store.dispatch(ClientFileActions.deleteClientFile({ id, clientId }));
  }
}

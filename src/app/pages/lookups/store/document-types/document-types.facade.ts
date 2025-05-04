import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './document-types.actions';
import * as Selectors from './document-types.selectors';
import { Observable } from 'rxjs';
import { DocumentType } from './document-type.model';

@Injectable({ providedIn: 'root' })
export class DocumentTypesFacade {
  items$: Observable<DocumentType[]> = this.store.select(
    Selectors.selectDocumentTypes
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectDocumentTypesTotal
  );
  history$: Observable<DocumentType[]> = this.store.select(
    Selectors.selectDocumentTypesHistory
  );
  current$: Observable<DocumentType | undefined> = this.store.select(
    Selectors.selectCurrentDocumentType
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectDocumentTypesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectDocumentTypesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadDocumentTypes());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadDocumentTypesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadDocumentType({ id }));
  }
  create(data: Partial<DocumentType>) {
    this.store.dispatch(Actions.createDocumentType({ data }));
  }
  update(id: any, data: Partial<DocumentType>) {
    this.store.dispatch(Actions.updateDocumentType({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteDocumentType({ id }));
  }
}
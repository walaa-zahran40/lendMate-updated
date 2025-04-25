import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as DocumentTypeActions from './document-type.actions';
import * as DocumentTypeSelectors from './document-type.selectors';

@Injectable({ providedIn: 'root' })
export class DocumentTypeFacade {
  documentTypes$ = this.store.select(
    DocumentTypeSelectors.selectAllDocumentTypes
  );
  loading$ = this.store.select(
    DocumentTypeSelectors.selectDocumentTypesLoading
  );

  constructor(private store: Store) {}

  loadDocumentTypes() {
    this.store.dispatch(DocumentTypeActions.loadDocumentTypes());
  }
}

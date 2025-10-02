// app/core/agreement-files/facade/agreement-files.facade.ts
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgreementFilesActions } from './agreement-files.actions';
import { AgreementFilesSelectors } from './agreement-files.selectors';
import { Observable } from 'rxjs';
import { AgreementFile } from './agreement-file.model';

@Injectable({ providedIn: 'root' })
export class AgreementFilesFacade {
  private readonly store = inject(Store);

  // Exposed selectors
  all$: Observable<AgreementFile[]> = this.store.select(
    AgreementFilesSelectors.selectAll
  );
  loading$ = this.store.select(AgreementFilesSelectors.loading);
  loaded$ = this.store.select(AgreementFilesSelectors.loaded);
  error$ = this.store.select(AgreementFilesSelectors.error);
  totalCount$ = this.store.select(AgreementFilesSelectors.totalCount);
  currentAgreementId$ = this.store.select(
    AgreementFilesSelectors.currentAgreementId
  );
  creating$ = this.store.select(AgreementFilesSelectors.creating);
  updating$ = this.store.select(AgreementFilesSelectors.updating);

  byId$(id: number) {
    return this.store.select(AgreementFilesSelectors.selectById(id));
  }
  deleting$(id: number) {
    return this.store.select(AgreementFilesSelectors.selectDeleting(id));
  }

  // Commands
  loadPage(pageNumber?: number) {
    this.store.dispatch(AgreementFilesActions.loadPage({ pageNumber }));
  }
  loadByAgreement(agreementId: number) {
    this.store.dispatch(AgreementFilesActions.loadByAgreement({ agreementId }));
  }
  loadOne(agreementFileId: number) {
    this.store.dispatch(AgreementFilesActions.loadOne({ agreementFileId }));
  }
  create(params: {
    agreementId: number;
    documentTypeId: number;
    expiryDate: string;
    file: File;
  }) {
    this.store.dispatch(AgreementFilesActions.create(params));
  }
  update(params: {
    id: number;
    payload: {
      id: number;
      agreementId: number;
      fileId: number;
      expiryDate: string;
    };
  }) {
    this.store.dispatch(AgreementFilesActions.update(params));
  }
  delete(id: number) {
    this.store.dispatch(AgreementFilesActions.delete({ id }));
  }
  clearError() {
    this.store.dispatch(AgreementFilesActions.clearError());
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './agreement-files.actions';
import * as Selectors from './agreement-files.selectors';
import { Observable } from 'rxjs';
import { AgreementFile } from './agreement-file.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AgreementFilesFacade {
  items$: Observable<AgreementFile[]> = this.store.select(
    Selectors.selectAgreementFiles
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectAgreementFilesTotal
  );
  history$: Observable<AgreementFile[]> = this.store.select(
    Selectors.selectAgreementFilesHistory
  );
  current$: Observable<AgreementFile | undefined> = this.store.select(
    Selectors.selectCurrentAgreementFile
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectAgreementFilesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectAgreementFilesError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAgreementFiles());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadAgreementFilesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadAgreementFile({ id }));
  }
  create(data: Partial<AgreementFile>) {
    this.store.dispatch(Actions.createAgreementFile({ data }));
  }
  update(id: any, data: Partial<AgreementFile>) {
    this.store.dispatch(Actions.updateAgreementFile({ id, data }));
  }
  /** NEW: dispatch the by-clientId loader */
  loadAgreementFilesByClientId(clientId?: number) {
    if (clientId == null || isNaN(clientId)) {
      console.error(
        '❌ Facade.loadAgreementFilesByClientId called with invalid id:',
        clientId
      );
      return;
    }
    this.store.dispatch(Actions.loadAgreementFilesByClientId({ clientId }));
  }

  /** UPDATED: now expects both id & parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteAgreementFile({ id, clientId }));
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadAgreementFilesByClientId({ clientId }));
  }
}

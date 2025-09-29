import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './agreement-files.actions';
import * as Selectors from './agreement-files.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { AgreementFile } from './agreement-file.model';

@Injectable({ providedIn: 'root' })
export class AgreementFilesFacade {
  all$ = this.store.select(Selectors.selectAllAgreementFiles);
  loading$ = this.store.select(Selectors.selectAgreementFilesLoading);
  error$ = this.store.select(Selectors.selectAgreementFilesError);
  totalCount$ = this.store.select(Selectors.selectAgreementFilesTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  workFlowActionSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }
  createBinary(formData: FormData) {
    this.store.dispatch(Actions.createEntityBinary({ formData }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }
  loadByIdEdit(id: number) {
    this.store.dispatch(Actions.loadByIdEdit({ id }));
  }
  create(payload: Partial<Omit<AgreementFile, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<AgreementFile>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }

  // History management
  readonly assetHistory$ = this.store.select(Selectors.selectHistory);
  readonly assetHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadAgreementFileHistory());
  }
}

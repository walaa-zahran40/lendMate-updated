import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './sme-client-codes.actions';
import * as Selectors from './sme-client-codes.selectors';
import { SMEClientCode } from './sme-client-codes.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class SMEClientCodesFacade {
  all$ = this.store.select(Selectors.selectAllSMEClientCodes);
  loading$ = this.store.select(Selectors.selectSMEClientCodesLoading);
  error$ = this.store.select(Selectors.selectSMEClientCodesError);
  totalCount$ = this.store.select(Selectors.selectSMEClientCodesTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<SMEClientCode, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<SMEClientCode>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}

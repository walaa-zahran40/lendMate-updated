import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './communication-flow-types.actions';
import * as Selectors from './communication-flow-types.selectors';
import { CommunicationFlowType } from './communication-flow-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class CommunicationFlowTypesFacade {
  all$ = this.store.select(Selectors.selectAllCommunicationFlowTypes);
  loading$ = this.store.select(Selectors.selectCommunicationFlowTypesLoading);
  error$ = this.store.select(Selectors.selectCommunicationFlowTypesError);
  totalCount$ = this.store.select(
    Selectors.selectCommunicationFlowTypesTotalCount
  );
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

  create(payload: Partial<Omit<CommunicationFlowType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<CommunicationFlowType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}

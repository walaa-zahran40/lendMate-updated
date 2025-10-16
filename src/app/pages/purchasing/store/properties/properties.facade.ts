import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './properties.actions';
import * as Selectors from './properties.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { Property } from './property.model';

@Injectable({ providedIn: 'root' })
export class propertiesFacade {
  all$ = this.store.select(Selectors.selectAllProperties);
  loading$ = this.store.select(Selectors.selectPropertiesLoading);
  error$ = this.store.select(Selectors.selectPropertiesError);
  totalCount$ = this.store.select(Selectors.selectPropertiesTotalCount);
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

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<Property, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Property>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  // History management
  readonly propertyHistory$ = this.store.select(Selectors.selectHistory);
  readonly propertyHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadPropertyHistory());
  }
  selectedByAssetId(assetId: number) {
    return this.store.select(Selectors.selectByAssetId(assetId));
  }
  loadByAssetId(assetId: number) {
    this.store.dispatch(Actions.loadByAssetId({ assetId }));
  }
}

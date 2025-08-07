import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './vehicle-models.actions';
import * as Selectors from './vehicle-models.selectors';
import { VehicleModel } from './vehicle-model.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class VehicleModelsFacade {
  all$ = this.store.select(Selectors.selectAllVehicleModels);
  loading$ = this.store.select(Selectors.selectVehicleModelsLoading);
  error$ = this.store.select(Selectors.selectVehicleModelsError);
  totalCount$ = this.store.select(Selectors.selectVehicleModelsTotalCount);
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

  create(payload: Partial<Omit<VehicleModel, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<VehicleModel>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  // History management
  readonly vehicleModelHistory$ = this.store.select(Selectors.selectHistory);
  readonly vehicleModelHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadVehicleModelHistory());
  }
}

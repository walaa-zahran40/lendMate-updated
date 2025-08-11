import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './vehicles.actions';
import * as Selectors from './vehicles.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { Vehicle } from './vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehiclesFacade {
  all$ = this.store.select(Selectors.selectAllVehicles);
  loading$ = this.store.select(Selectors.selectVehiclesLoading);
  error$ = this.store.select(Selectors.selectVehiclesError);
  totalCount$ = this.store.select(Selectors.selectVehiclesTotalCount);
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
  // vehicles.facade.ts
  selectedByAssetId(assetId: number) {
    return this.store.select(Selectors.selectByAssetId(assetId));
  }
  // If your API is by assetId, add this. If not, keep loadById(assetId).
  loadByAssetId(assetId: number) {
    this.loadById(assetId);
  }

  create(payload: Partial<Omit<Vehicle, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Vehicle>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  // History management
  readonly vehicleHistory$ = this.store.select(Selectors.selectHistory);
  readonly vehicleHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadVehicleHistory());
  }
}

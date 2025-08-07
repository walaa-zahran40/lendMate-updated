import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './vehicle-manufacturers.actions';
import * as Selectors from './vehicle-manufacturers.selectors';
import { VehicleManufacturer } from './vehicle-manufacturer.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class VehicleManufacturersFacade {
  all$ = this.store.select(Selectors.selectAllVehicleManufacturers);
  loading$ = this.store.select(Selectors.selectVehicleManufacturersLoading);
  error$ = this.store.select(Selectors.selectVehicleManufacturersError);
  totalCount$ = this.store.select(
    Selectors.selectVehicleManufacturersTotalCount
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

  create(payload: Partial<Omit<VehicleManufacturer, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<VehicleManufacturer>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  // History management
  readonly vehicleManufacturerHistory$ = this.store.select(
    Selectors.selectHistory
  );
  readonly vehicleManufacturerHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadVehicleManufacturerHistory());
  }
}

import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './equipments.actions';
import * as Selectors from './equipments.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { Equipment } from './equipment.model';

@Injectable({ providedIn: 'root' })
export class EquipmentsFacade {
  all$ = this.store.select(Selectors.selectAllEquipments);
  loading$ = this.store.select(Selectors.selectEquipmentsLoading);
  error$ = this.store.select(Selectors.selectEquipmentsError);
  totalCount$ = this.store.select(Selectors.selectEquipmentsTotalCount);
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

  create(payload: Partial<Omit<Equipment, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Equipment>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  // History management
  readonly equipmentHistory$ = this.store.select(Selectors.selectHistory);
  readonly equipmentHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadEquipmentHistory());
  }
  selectedByAssetId(assetId: number) {
    console.log('[EquipmentsFacade] selectedByAssetId subscribe', { assetId });
    return this.store.select(Selectors.selectEquipmentByAssetId(assetId));
  }

  loadByAssetId(assetId: number) {
    console.log('[EquipmentsFacade] dispatch loadByAssetId', { assetId });
    this.store.dispatch(Actions.loadByAssetId({ assetId }));
  }
}

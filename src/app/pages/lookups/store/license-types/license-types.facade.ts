import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './license-types.actions';
import * as Selectors from './license-types.selectors';
import { LicenseType } from './license-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class LicenseTypesFacade {
  all$ = this.store.select(Selectors.selectAllLicenseTypes);
  loading$ = this.store.select(Selectors.selectLicenseTypesLoading);
  error$ = this.store.select(Selectors.selectLicenseTypesError);
  totalCount$ = this.store.select(Selectors.selectLicenseTypesTotalCount);
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

  create(payload: Partial<Omit<LicenseType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<LicenseType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectLicenseTypeHistory);

  readonly licenseTypeHistory$ = this.store.select(
    Selectors.selectLicenseTypeHistory
  );
  readonly licenseTypeHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadLicenseTypeHistory());
  }
}

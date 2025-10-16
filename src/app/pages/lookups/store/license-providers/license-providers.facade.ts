import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './license-providers.actions';
import * as Selectors from './license-providers.selectors';
import { LicenseProvider } from './license-provider.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class LicenseProvidersFacade {
  all$ = this.store.select(Selectors.selectAllLicenseProviders);
  loading$ = this.store.select(Selectors.selectLicenseProvidersLoading);
  error$ = this.store.select(Selectors.selectLicenseProvidersError);
  totalCount$ = this.store.select(Selectors.selectLicenseProvidersTotalCount);
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

  create(payload: Partial<Omit<LicenseProvider, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<LicenseProvider>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectLicenseProviderHistory);

  readonly licenseProviderHistory$ = this.store.select(
    Selectors.selectLicenseProviderHistory
  );
  readonly licenseProviderHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadLicenseProviderHistory());
  }
}

import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './license-information.actions';
import * as Selectors from './license-information.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { LicenseInformation } from './license-information.model';

@Injectable({ providedIn: 'root' })
export class LicenseInformationFacade {
  all$ = this.store.select(Selectors.selectAllLicenseInformation);
  loading$ = this.store.select(Selectors.selectLicenseInformationLoading);
  error$ = this.store.select(Selectors.selectLicenseInformationError);
  totalCount$ = this.store.select(Selectors.selectLicenseInformationTotalCount);
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

  create(payload: Partial<Omit<LicenseInformation, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<LicenseInformation>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  // History management
  readonly licenseInformationHistory$ = this.store.select(
    Selectors.selectHistory
  );
  readonly licenseInformationHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadLicenseInformationHistory());
  }
}

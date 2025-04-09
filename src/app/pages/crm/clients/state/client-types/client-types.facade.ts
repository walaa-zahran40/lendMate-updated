import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClientTypeActions from './client-types.actions';
import * as ClientTypeSelectors from './client-types.selectors';

@Injectable({ providedIn: 'root' })
export class ClientTypesFacade {
  types$ = this.store.select(ClientTypeSelectors.selectAllClientTypes);
  loading$ = this.store.select(ClientTypeSelectors.selectClientTypesLoading);
  error$ = this.store.select(ClientTypeSelectors.selectClientTypesError);

  constructor(private store: Store) {}

  loadClientTypes() {
    this.store.dispatch(ClientTypeActions.loadClientTypes());
  }
}

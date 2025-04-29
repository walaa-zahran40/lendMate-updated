import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as IdentityActions from './identity.actions';
import * as IdentitySelectors from './identity.selectors';

@Injectable({ providedIn: 'root' })
export class IdentityFacade {
  identityTypes$ = this.store.select(
    IdentitySelectors.selectAllClientIdentities
  );
  currentIdentity$ = this.store.select(
    IdentitySelectors.selectCurrentClientIdentity
  );
  loading$ = this.store.select(IdentitySelectors.selectClientIdentitiesLoading);
  constructor(private store: Store) {}

  loadTypes() {
    this.store.dispatch(IdentityActions.loadClientIdentities()); // existing
  }
  loadIdentity(clientId: number) {
    this.store.dispatch(IdentityActions.loadClientIdentity({ clientId }));
  }
}

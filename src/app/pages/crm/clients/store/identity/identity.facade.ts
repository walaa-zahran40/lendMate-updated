import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as IdentityActions from './identity.actions';
import * as IdentitySelectors from './identity.selectors';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdentityFacade {
  identityTypes$: Observable<IdentityActions.IdentityType[]> =
    this.store.select(IdentitySelectors.selectAllClientIdentities);
  loading$ = this.store.select(IdentitySelectors.selectClientIdentitiesLoading);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(IdentityActions.loadClientIdentities());
  }
}

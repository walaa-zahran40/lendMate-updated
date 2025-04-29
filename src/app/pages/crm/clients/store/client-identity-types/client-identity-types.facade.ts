// client-identity-types.facade.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as A from './client-identity-types.actions';
import * as S from './client-identity-types.selectors';

@Injectable({ providedIn: 'root' })
export class ClientIdentityTypesFacade {
  all$ = this.store.select(S.selectAllClientIdentityTypes);
  loading$ = this.store.select(S.selectClientIdentityTypesLoading);
  error$ = this.store.select(S.selectClientIdentityTypesError);
  totalCount$ = this.store.select(S.selectClientIdentityTypesTotalCount);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(A.loadAllClientIdentityTypes({ pageNumber }));
  }
}

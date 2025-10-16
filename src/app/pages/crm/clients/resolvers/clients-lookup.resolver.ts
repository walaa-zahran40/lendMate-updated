import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import {
  filter,
  skip,
  take,
  timeout,
  catchError,
  tap,
  map,
} from 'rxjs/operators';
import * as clientsActions from '../../clients/store/_clients/allclients/clients.actions';
import { Client } from '../../clients/store/_clients/allclients/client.model';
import {
  selectAllClients,
  selectClientsLoading,
} from '../../clients/store/_clients/allclients/clients.selectors';

export const clientsLookupResolver: ResolveFn<Client[]> = () => {
  const store = inject(Store);
  store.dispatch(clientsActions.loadAll({})); // idempotent

  return combineLatest([
    store.select(selectAllClients),
    store.select(selectClientsLoading),
  ]).pipe(
    filter(([_, loading]) => !loading),
    map(([list]) => list),
    take(1),
    timeout({ first: 8000 }),
    catchError(() => of([])),
    tap((list) => console.log('[resolver:clients] resolved', list.length))
  );
};

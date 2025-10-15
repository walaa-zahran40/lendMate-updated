// client-guarantor.resolver.ts
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, take, timeout, catchError } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import * as ClientGuarantorActions from '../../clients/store/client-guarantors/client-guarantors.actions';
import { ClientGuarantor } from '../store/client-guarantors/client-guarantor.model';
import { ClientGuarantorsFacade } from '../store/client-guarantors/client-guarantors.facade';
export const clientGuarantorResolver: ResolveFn<ClientGuarantor | null> = (
  route: ActivatedRouteSnapshot
) => {
  const idParam = route.paramMap.get('id');
  const id = idParam ? Number(idParam) : NaN;
  if (!Number.isFinite(id)) return of(null);

  const facade = inject(ClientGuarantorsFacade);
  const actions$ = inject(Actions);

  // Important: always refetch for edit so we don’t use stale cache
  facade.loadOne(id); // should dispatch load regardless of current cache

  // Wait for the *fresh* response for this id
  return actions$.pipe(
    ofType(ClientGuarantorActions.loadClientGuarantorSuccess),
    filter(({ client }) => client?.id === id),
    map(({ client }) => client),
    take(1),
    timeout({ first: 8000 }),
    catchError(() => of(null))
  );
};

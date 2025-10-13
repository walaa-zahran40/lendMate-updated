import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { map, take, catchError, filter } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { PhoneTypesFacade } from '../../lookups/store/phone-types/phone-types.facade';
import { ClientPhoneNumbersFacade } from '../clients/store/client-phone-numbers/client-phone-numbers.facade';
import { loadClientPhoneNumbersByClientIdSuccess } from '../clients/store/client-phone-numbers/client-phone-numbers.actions';
import { PhoneType } from '../../lookups/store/phone-types/phone-type.model';

export interface ClientPhoneNumbersListData {
  clientId: number;
  phoneTypes: PhoneType[];
  items: any[];
}

export const clientPhoneNumbersListResolver: ResolveFn<
  ClientPhoneNumbersListData | null
> = (route: ActivatedRouteSnapshot) => {
  const idParam = route.paramMap.get('clientId');
  const clientId = idParam ? Number(idParam) : NaN;
  if (!Number.isFinite(clientId)) return of(null);

  const actions$ = inject(Actions);
  const phoneTypesFacade = inject(PhoneTypesFacade);
  const facade = inject(ClientPhoneNumbersFacade);

  // kick off loads
  phoneTypesFacade.loadAll();
  facade.loadByClientId(clientId);

  // wait for both phone types and phone numbers
  const phoneTypes$ = phoneTypesFacade.all$.pipe(
    filter((a) => !!a && a.length > 0),
    take(1)
  );
  const items$ = actions$.pipe(
    ofType(loadClientPhoneNumbersByClientIdSuccess),
    take(1),
    map((a) => a.items)
  );

  return forkJoin({ phoneTypes: phoneTypes$, items: items$ }).pipe(
    map(({ phoneTypes, items }) => ({ clientId, phoneTypes, items })),
    catchError(() => of({ clientId, phoneTypes: [], items: [] }))
  );
};

import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { filter, map, take, catchError } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { PhoneTypesFacade } from '../../lookups/store/phone-types/phone-types.facade';
import { ClientPhoneNumbersFacade } from '../clients/store/client-phone-numbers/client-phone-numbers.facade';
import { loadClientPhoneNumberSuccess } from '../clients/store/client-phone-numbers/client-phone-numbers.actions';

export interface ClientPhoneNumberBundle {
  mode: 'add' | 'edit' | 'view';
  clientIdFromQP: number | null;
  record: any | null;
  phoneTypes: any[];
}

export const clientPhoneNumberBundleResolver: ResolveFn<
  ClientPhoneNumberBundle
> = (route: ActivatedRouteSnapshot) => {
  const mode =
    (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
  const clientIdFromQP = route.queryParamMap.get('clientId');
  const parentClientId = clientIdFromQP ? Number(clientIdFromQP) : null;

  const phoneTypesFacade = inject(PhoneTypesFacade);
  const facade = inject(ClientPhoneNumbersFacade);
  const actions$ = inject(Actions);

  phoneTypesFacade.loadAll();
  const phoneTypes$ = phoneTypesFacade.all$.pipe(
    filter((a) => a.length > 0),
    take(1)
  );

  if (mode === 'edit' || mode === 'view') {
    const recordId = Number(route.paramMap.get('clientId')); // param holds the RECORD id on your edit route
    facade.loadOne(recordId);

    const record$ = actions$.pipe(
      ofType(loadClientPhoneNumberSuccess),
      map((a) => a.client),
      filter((rec) => !!rec && rec.id === recordId),
      take(1)
    );

    return forkJoin({ record: record$, phoneTypes: phoneTypes$ }).pipe(
      map(({ record, phoneTypes }) => ({
        mode,
        clientIdFromQP: parentClientId,
        record,
        phoneTypes,
      })),
      catchError(() =>
        of({
          mode,
          clientIdFromQP: parentClientId,
          record: null,
          phoneTypes: [],
        })
      )
    );
  }

  return phoneTypes$.pipe(
    map((phoneTypes) => ({
      mode,
      clientIdFromQP: parentClientId,
      record: null,
      phoneTypes,
    })),
    catchError(() =>
      of({ mode, clientIdFromQP: parentClientId, record: null, phoneTypes: [] })
    )
  );
};

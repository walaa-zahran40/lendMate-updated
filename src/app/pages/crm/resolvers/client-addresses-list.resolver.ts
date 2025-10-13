// crm/resolvers/client-addresses-list.resolver.ts
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import { filter, map, take, catchError } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

import { AreasFacade } from '../../lookups/store/areas/areas.facade';
import { selectAllAreas } from '../../lookups/store/areas/areas.selectors';
import { ClientAddress } from '../clients/store/client-addresses/client-address.model';
import { loadClientAddressesByClientIdSuccess } from '../clients/store/client-addresses/client-addresses.actions';
import { ClientAddressesFacade } from '../clients/store/client-addresses/client-addresses.facade';

export interface ClientAddressesListData {
  clientId: number;
  areas: { id: number; name: string }[];
  addresses: ClientAddress[];
}

export const clientAddressesListResolver: ResolveFn<
  ClientAddressesListData | null
> = (route: ActivatedRouteSnapshot) => {
  const idParam = route.paramMap.get('clientId');
  const clientId = idParam ? Number(idParam) : NaN;
  if (!Number.isFinite(clientId)) return of(null);

  const store = inject(Store);
  const actions$ = inject(Actions);
  const areasFacade = inject(AreasFacade);
  const addrFacade = inject(ClientAddressesFacade);

  areasFacade.loadAll();
  addrFacade.loadClientAddressesByClientId(clientId);

  const areas$ = store.select(selectAllAreas).pipe(
    filter((a) => a.length > 0),
    take(1)
  );

  const addresses$ = actions$.pipe(
    ofType(loadClientAddressesByClientIdSuccess), // <-- your success action
    filter((a) => a.clientId === clientId), // <-- guard in case other clients load too
    map((a) => a.items as ClientAddress[]),
    take(1)
  );

  return forkJoin({ areas: areas$, addresses: addresses$ }).pipe(
    map(({ areas, addresses }) => ({ clientId, areas, addresses })),
    catchError(() => of({ clientId, areas: [], addresses: [] }))
  );
};

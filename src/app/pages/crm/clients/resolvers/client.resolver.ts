import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';
import { Client } from '../../clients/store/_clients/allclients/client.model';
import { ClientsFacade } from '../../clients/store/_clients/allclients/clients.facade';

export const clientResolver: ResolveFn<Client | null> = (
  route: ActivatedRouteSnapshot
) => {
  const clientIdParam = route.paramMap.get('clientId');
  const clientId = clientIdParam ? Number(clientIdParam) : null;
  const type = route.queryParamMap.get('type'); // "Company" | "Individual"
  if (!clientId || type !== 'Company') return of(null);

  const facade = inject(ClientsFacade);
  facade.loadById(clientId);

  return facade.selected$.pipe(
    tap((v) => console.log('[Resolver] client (Company)', v)),
    filter((c): c is Client => !!c && c.id === clientId),
    take(1),
    catchError((err) => {
      console.warn('[Resolver] client error', err);
      return of(null);
    })
  );
};

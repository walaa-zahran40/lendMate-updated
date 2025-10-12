// src/app/pages/crm/resolvers/individual.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';
import { Individual } from '../clients/store/_clients/individuals/individual.model';
import { IndividualsFacade } from '../clients/store/_clients/individuals/individuals.facade';

export const individualResolver: ResolveFn<Individual | null> = (
  route: ActivatedRouteSnapshot
) => {
  const clientIdParam = route.paramMap.get('clientId');
  const clientId = clientIdParam ? Number(clientIdParam) : null;
  const type = route.queryParamMap.get('type'); // "Company" | "Individual"
  if (!clientId || type !== 'Individual') return of(null);

  const facade = inject(IndividualsFacade);
  facade.loadById(clientId);

  return facade.selected$.pipe(
    tap((v) => console.log('[Resolver] individual', v)),
    filter((i): i is Individual => !!i && i.clientId === clientId),
    take(1),
    catchError((err) => {
      console.warn('[Resolver] individual error', err);
      return of(null);
    })
  );
};

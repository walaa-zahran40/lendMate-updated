import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';
import { ClientsOnboardingFacade } from '../clients/store/_client-onboarding/allclients/clients-onboarding.facade';
import { ClientOnboarding } from '../clients/store/_client-onboarding/allclients/client-onboarding.model';

export const clientOnboardingResolver: ResolveFn<ClientOnboarding | null> = (
  route: ActivatedRouteSnapshot
) => {
  const clientIdParam = route.paramMap.get('clientId');
  const clientId = clientIdParam ? Number(clientIdParam) : null;
  const type = route.queryParamMap.get('type'); // "Company" | "Individual"
  if (!clientId || type !== 'Company') return of(null);

  const facade = inject(ClientsOnboardingFacade);
  facade.loadById(clientId);

  return facade.selected$.pipe(
    tap((v) => console.log('[Resolver] clientOnboarding (Company)', v)),
    filter((c): c is ClientOnboarding => !!c && c.id === clientId),
    take(1),
    catchError((err) => {
      console.warn('[Resolver] clientOnboarding error', err);
      return of(null);
    })
  );
};

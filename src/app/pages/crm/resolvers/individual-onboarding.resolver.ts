import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, filter, take, tap } from 'rxjs/operators';
import { IndividualOnboardingsFacade } from '../clients/store/_client-onboarding/individuals/individuals-onboarding.facade';
import { IndividualOnboarding } from '../clients/store/_client-onboarding/individuals/individual-onboarding.model';

export const individualOnboardingResolver: ResolveFn<
  IndividualOnboarding | null
> = (route: ActivatedRouteSnapshot) => {
  const clientIdParam = route.paramMap.get('clientId');
  const clientId = clientIdParam ? Number(clientIdParam) : null;
  const type = route.queryParamMap.get('type'); // "Company" | "Individual"
  if (!clientId || type !== 'Individual') return of(null);

  const facade = inject(IndividualOnboardingsFacade);
  facade.loadById(clientId);

  return facade.selected$.pipe(
    tap((v) => console.log('[Resolver] individualOnboarding', v)),
    filter((i): i is IndividualOnboarding => !!i && i.clientId === clientId),
    take(1),
    catchError((err) => {
      console.warn('[Resolver] individualOnboarding error', err);
      return of(null);
    })
  );
};

import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, skip, take, tap } from 'rxjs/operators';
import { ClientGuarantor } from '../../clients/store/client-guarantors/client-guarantor.model';
import { ClientGuarantorsFacade } from '../../clients/store/client-guarantors/client-guarantors.facade';

export const clientGuarantorsByClientResolver: ResolveFn<ClientGuarantor[]> = (
  route: ActivatedRouteSnapshot
) => {
  const clientIdParam = route.paramMap.get('clientId');
  const clientId = clientIdParam ? Number(clientIdParam) : NaN;
  if (!Number.isFinite(clientId)) return of([]);

  const facade = inject(ClientGuarantorsFacade);
  // kick off the load
  facade.loadClientGuarantorsByClientId(clientId);

  // Most facades expose items$ that emits `[]` immediately, then real data.
  // `skip(1)` ignores the initial empty emission and takes the next one
  // (which can still be [] if truly no guarantors — that’s OK).
  return facade.items$.pipe(
    skip(1),
    take(1),
    tap((list) =>
      console.log('[resolver:guarantorsByClient] resolved', list.length)
    ),
    catchError(() => of([]))
  );
};

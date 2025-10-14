import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { filter, take, catchError, timeout } from 'rxjs/operators';
import { ClientGuarantor } from '../clients/store/client-guarantors/client-guarantor.model';
import { ClientGuarantorsFacade } from '../clients/store/client-guarantors/client-guarantors.facade';

export const clientGuarantorResolver: ResolveFn<ClientGuarantor | null> = (
  route: ActivatedRouteSnapshot
) => {
  const idParam = route.paramMap.get('id');
  const id = idParam ? Number(idParam) : NaN;
  if (!Number.isFinite(id)) return of(null); // add mode

  const facade = inject(ClientGuarantorsFacade);
  facade.loadOne(id);

  return facade.current$.pipe(
    filter((g): g is ClientGuarantor => !!g && g.id === id),
    take(1),
    timeout({ first: 8000 }),
    catchError(() => of(null))
  );
};

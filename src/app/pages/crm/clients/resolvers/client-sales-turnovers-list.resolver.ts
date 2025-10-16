import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClientSalesTurnoversService } from '../../clients/store/client-sales-turnovers/client-sales-turnovers.service';
import { ClientSalesTurnover } from '../../clients/store/client-sales-turnovers/client-sales-turnovers.model';

export interface ClientSalesTurnoversListData {
  clientId: number;
  items: ClientSalesTurnover[];
}

export const clientSalesTurnoverListResolver: ResolveFn<
  ClientSalesTurnoversListData | null
> = (route: ActivatedRouteSnapshot) => {
  const raw = route.paramMap.get('clientId');
  const clientId = raw ? Number(raw) : NaN;
  if (!Number.isFinite(clientId)) return of(null);

  const service = inject(ClientSalesTurnoversService);
  return service.getByClientId(clientId).pipe(
    map((items) => ({
      clientId,
      items: [...items].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
    })),
    catchError(() => of({ clientId, items: [] }))
  );
};

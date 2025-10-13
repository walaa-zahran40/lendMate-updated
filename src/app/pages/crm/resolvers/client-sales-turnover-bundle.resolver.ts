import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClientSalesTurnoversService } from '../clients/store/client-sales-turnovers/client-sales-turnovers.service';
import { ClientSalesTurnover } from '../clients/store/client-sales-turnovers/client-sales-turnovers.model';

export interface ClientSalesTurnoverBundle {
  mode: 'add' | 'edit' | 'view';
  parentClientId: number | null; // from path (add) or from fetched record (edit/view)
  record: ClientSalesTurnover | null;
}

export const clientSalesTurnoverBundleResolver: ResolveFn<
  ClientSalesTurnoverBundle
> = (route: ActivatedRouteSnapshot) => {
  const mode =
    (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
  const service = inject(ClientSalesTurnoversService);

  // ADD mode — path has :clientId
  if (route.routeConfig?.path?.includes('add-sales-turnover')) {
    const rawClientId = route.paramMap.get('clientId');
    const parentClientId = rawClientId ? Number(rawClientId) : null;
    return of({ mode, parentClientId, record: null });
  }

  // EDIT/VIEW mode — path has :id
  const rawId = route.paramMap.get('id');
  const id = rawId ? Number(rawId) : NaN;
  if (!Number.isFinite(id)) {
    return of({ mode, parentClientId: null, record: null });
  }

  return service.getById(id).pipe(
    map((record) => ({
      mode,
      parentClientId: record?.clientId ?? null,
      record: record ?? null,
    })),
    catchError(() => of({ mode, parentClientId: null, record: null }))
  );
};

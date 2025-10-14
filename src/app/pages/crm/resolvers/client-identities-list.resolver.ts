import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, map, of } from 'rxjs';
import { IdentificationTypesService } from '../../lookups/store/identification-types/identification-types.service';
import { IdentificationType } from '../../lookups/store/identification-types/identification-type.model';
import { ClientIdentitiesService } from '../clients/store/client-identities/client-identities.service';
import { ClientIdentity } from '../clients/store/client-identities/client-identity.model';

export interface ClientIdentitiesListData {
  clientId: number;
  items: ClientIdentity[];
  identificationTypes: IdentificationType[];
}

@Injectable({ providedIn: 'root' })
export class ClientIdentitiesListResolver
  implements Resolve<ClientIdentitiesListData | null>
{
  constructor(
    private identities: ClientIdentitiesService,
    private idTypes: IdentificationTypesService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const raw = route.paramMap.get('clientId');
    const clientId = raw !== null ? Number(raw) : NaN;
    if (!Number.isFinite(clientId)) return of(null);

    return forkJoin({
      items: this.identities.getByClientId(clientId),
      identificationTypes: this.idTypes.getAll(), // adapt if your service differs
    }).pipe(
      map(({ items, identificationTypes }) => ({
        clientId,
        items,
        identificationTypes,
      }))
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { IdentificationTypesService } from '../../lookups/store/identification-types/identification-types.service';
import { IdentificationType } from '../../lookups/store/identification-types/identification-type.model';
import { ClientIdentitiesService } from '../clients/store/client-identities/client-identities.service';
import { ClientIdentity } from '../clients/store/client-identities/client-identity.model';

export interface ClientIdentityBundle {
  mode: 'add' | 'edit' | 'view';
  clientIdFromQP?: number; // from query params
  record?: ClientIdentity | null;
  identificationTypes: IdentificationType[];
}

@Injectable({ providedIn: 'root' })
export class ClientIdentityBundleResolver
  implements Resolve<ClientIdentityBundle>
{
  constructor(
    private identities: ClientIdentitiesService,
    private idTypes: IdentificationTypesService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const mode = (route.queryParamMap.get('mode') as any) ?? 'add';
    const clientIdFromQP = Number(route.queryParamMap.get('clientId') ?? '');
    const idParam = Number(route.paramMap.get('id') ?? ''); // 👈 edit/view routes use :id

    const base = {
      mode,
      clientIdFromQP: Number.isFinite(clientIdFromQP)
        ? clientIdFromQP
        : undefined,
    };

    if (mode === 'edit' || mode === 'view') {
      if (!Number.isFinite(idParam)) {
        return forkJoin({ identificationTypes: this.idTypes.getAll() }).pipe(
          map(({ identificationTypes }) => ({
            ...base,
            record: null,
            identificationTypes,
          }))
        );
      }
      return forkJoin({
        record: this.identities.getById(idParam),
        identificationTypes: this.idTypes.getAll(),
      }).pipe(map((r) => ({ ...base, ...r })));
    }

    // mode === 'add'
    return forkJoin({ identificationTypes: this.idTypes.getAll() }).pipe(
      map(({ identificationTypes }) => ({
        ...base,
        record: null,
        identificationTypes,
      }))
    );
  }
}

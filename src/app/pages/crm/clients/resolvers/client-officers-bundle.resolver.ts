import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClientOfficerType } from '../../../lookups/store/client-officer-types/client-officer-type.model';
import { ClientOfficerTypesService } from '../../../lookups/store/client-officer-types/client-officer-types.service';
import { Officer } from '../../../organizations/store/officers/officer.model';
import { OfficersService } from '../../../organizations/store/officers/officers.service';
import { ClientOfficer } from '../../clients/store/client-officers/client-officer.model';
import { ClientOfficersService } from '../../clients/store/client-officers/client-officers.service';

export interface ClientOfficersBundle {
  mode: 'add' | 'edit' | 'view';
  record?: ClientOfficer;
  officers: Officer[];
  clientOfficerTypes: ClientOfficerType[];
  clientIdFromQP?: number;
}

@Injectable({ providedIn: 'root' })
export class ClientOfficersBundleResolver
  implements Resolve<ClientOfficersBundle>
{
  constructor(
    private api: ClientOfficersService,
    private officersApi: OfficersService,
    private typesApi: ClientOfficerTypesService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ClientOfficersBundle> {
    const mode =
      (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;
    const id = Number(route.paramMap.get('id'));

    const [officersPaged, typesPaged, record] = await Promise.all([
      firstValueFrom(this.officersApi.getAll()),
      firstValueFrom(this.typesApi.getAll()),
      mode !== 'add' && id
        ? firstValueFrom(this.api.getById(id))
        : Promise.resolve(undefined),
    ]);

    const officers = officersPaged.items ?? officersPaged;
    const clientOfficerTypes = typesPaged;

    return { mode, record, officers, clientOfficerTypes, clientIdFromQP };
  }
}

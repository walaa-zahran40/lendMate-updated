import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TmlOfficerType } from '../../../lookups/store/tml-officer-types/tml-officer-type.model';
import { TmlOfficerTypesService } from '../../../lookups/store/tml-officer-types/tml-officer-types.service';
import { Officer } from '../../../organizations/store/officers/officer.model';
import { OfficersService } from '../../../organizations/store/officers/officers.service';
import { ClientTMLOfficer } from '../store/client-tml-officers/client-tml-officer.model';
import { ClientTMLOfficersService } from '../store/client-tml-officers/client-tml-officers.service';

export interface ClientTMLOfficersBundle {
  mode: 'add' | 'edit' | 'view';
  record?: ClientTMLOfficer;
  officers: Officer[];
  tmlOfficerTypes: TmlOfficerType[];
  clientIdFromQP?: number;
}

@Injectable({ providedIn: 'root' })
export class ClientTMLOfficersBundleResolver
  implements Resolve<ClientTMLOfficersBundle>
{
  constructor(
    private tmlApi: ClientTMLOfficersService,
    private officersApi: OfficersService,
    private tmlTypesApi: TmlOfficerTypesService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientTMLOfficersBundle> {
    const mode =
      (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;

    const id = Number(route.paramMap.get('id'));

    const [officersPaged, typesPaged, record] = await Promise.all([
      firstValueFrom(this.officersApi.getAll()),
      firstValueFrom(this.tmlTypesApi.getAll()),
      mode !== 'add' && id
        ? firstValueFrom(this.tmlApi.getById(id))
        : Promise.resolve(undefined),
    ]);

    const officers = officersPaged.items ?? officersPaged;
    const tmlOfficerTypes = typesPaged;

    return { mode, record, officers, tmlOfficerTypes, clientIdFromQP };
  }
}

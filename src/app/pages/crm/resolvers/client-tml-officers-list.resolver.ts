import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TmlOfficerType } from '../../lookups/store/tml-officer-types/tml-officer-type.model';
import { TmlOfficerTypesService } from '../../lookups/store/tml-officer-types/tml-officer-types.service';
import { Officer } from '../../organizations/store/officers/officer.model';
import { OfficersService } from '../../organizations/store/officers/officers.service';
import { ClientTMLOfficer } from '../clients/store/client-tml-officers/client-tml-officer.model';
import { ClientTMLOfficersService } from '../clients/store/client-tml-officers/client-tml-officers.service';

export interface ClientTMLOfficersListData {
  clientId: number;
  items: ClientTMLOfficer[];
  officers: Officer[];
  tmlOfficerTypes: TmlOfficerType[];
}

@Injectable({ providedIn: 'root' })
export class ClientTMLOfficersListResolver
  implements Resolve<ClientTMLOfficersListData>
{
  constructor(
    private tmlApi: ClientTMLOfficersService,
    private officersApi: OfficersService,
    private tmlTypesApi: TmlOfficerTypesService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientTMLOfficersListData> {
    const clientId = Number(route.paramMap.get('clientId'));

    const [items, officersPaged, typesPaged] = await Promise.all([
      firstValueFrom(this.tmlApi.getByClientId(clientId)),
      firstValueFrom(this.officersApi.getAll()),
      firstValueFrom(this.tmlTypesApi.getAll()),
    ]);

    const officers = officersPaged.items ?? officersPaged;
    const tmlOfficerTypes = typesPaged;

    return { clientId, items, officers, tmlOfficerTypes };
  }
}

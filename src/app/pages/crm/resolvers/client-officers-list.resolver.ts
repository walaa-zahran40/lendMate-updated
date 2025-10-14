import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClientOfficerType } from '../../lookups/store/client-officer-types/client-officer-type.model';
import { ClientOfficerTypesService } from '../../lookups/store/client-officer-types/client-officer-types.service';
import { Officer } from '../../organizations/store/officers/officer.model';
import { OfficersService } from '../../organizations/store/officers/officers.service';
import { ClientOfficer } from '../clients/store/client-officers/client-officer.model';
import { ClientOfficersService } from '../clients/store/client-officers/client-officers.service';

export interface ClientOfficersListData {
  clientId: number;
  items: ClientOfficer[];
  officers: Officer[];
  clientOfficerTypes: ClientOfficerType[];
}

@Injectable({ providedIn: 'root' })
export class ClientOfficersListResolver
  implements Resolve<ClientOfficersListData>
{
  constructor(
    private api: ClientOfficersService,
    private officersApi: OfficersService,
    private typesApi: ClientOfficerTypesService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientOfficersListData> {
    const clientId = Number(route.paramMap.get('clientId'));

    const [items, officersPaged, typesPaged] = await Promise.all([
      firstValueFrom(this.api.getByClientId(clientId)),
      firstValueFrom(this.officersApi.getAll()),
      firstValueFrom(this.typesApi.getAll()),
    ]);

    const officers = officersPaged.items ?? officersPaged;
    const clientOfficerTypes = typesPaged;

    return { clientId, items, officers, clientOfficerTypes };
  }
}

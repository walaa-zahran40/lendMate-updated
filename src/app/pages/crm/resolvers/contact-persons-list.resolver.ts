import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PhoneType } from '../../lookups/store/phone-types/phone-type.model';
import { PhoneTypesService } from '../../lookups/store/phone-types/phone-types.service';
import { ClientContactPerson } from '../clients/store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsService } from '../clients/store/client-contact-persons/client-contact-persons.service';

export interface ContactPersonsListData {
  clientId: number;
  items: ClientContactPerson[];
  phoneTypes: PhoneType[];
}

@Injectable({ providedIn: 'root' })
export class ContactPersonsListResolver
  implements Resolve<ContactPersonsListData>
{
  constructor(
    private api: ClientContactPersonsService,
    private phoneTypesApi: PhoneTypesService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ContactPersonsListData> {
    const clientId = Number(route.paramMap.get('clientId'));
    const [items, phoneTypesPaged] = await Promise.all([
      firstValueFrom(this.api.getByClientId(clientId)),
      firstValueFrom(this.phoneTypesApi.getAll()),
    ]);
    const phoneTypes = phoneTypesPaged;
    return { clientId, items, phoneTypes };
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll as loadAllTaxOffices } from '../../../lookups/store/tax-offices/tax-offices.actions';
import { selectAllTaxOffices } from '../../../lookups/store/tax-offices/tax-offices.selectors';
import { ClientTaxOfficesService } from '../store/client-tax-office/client-tax-offices.service';

export interface ClientTaxOfficesListData {
  clientId: number;
  items: any[];
  taxOffices: { id: number; name: string }[];
}

@Injectable({ providedIn: 'root' })
export class ClientTaxOfficesListResolver
  implements Resolve<ClientTaxOfficesListData>
{
  constructor(private api: ClientTaxOfficesService, private store: Store) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientTaxOfficesListData> {
    const clientId = Number(route.paramMap.get('clientId'));

    // prime lookups
    this.store.dispatch(loadAllTaxOffices({}));
    const taxOffices = await firstValueFrom(
      this.store.select(selectAllTaxOffices)
    );

    // list for the client
    const items = await firstValueFrom(this.api.getByClientId(clientId));

    return { clientId, items, taxOffices };
  }
}

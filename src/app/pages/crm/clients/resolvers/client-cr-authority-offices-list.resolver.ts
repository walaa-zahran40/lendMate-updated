import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll as loadAllAuthorityOffice } from '../../../lookups/store/authority-offices/authority-offices.actions';
import { selectAllAuthorityOffices } from '../../../lookups/store/authority-offices/authority-offices.selectors';
import { ClientCRAuthorityOfficesService } from '../store/client-cr-authority-office/client-cr-authority-office.service';

export interface ClientCRAuthorityOfficesListData {
  clientId: number;
  items: any[];
  authorityOffices: { id: number; name: string }[];
}

@Injectable({ providedIn: 'root' })
export class ClientCRAuthorityOfficesListResolver
  implements Resolve<ClientCRAuthorityOfficesListData>
{
  constructor(
    private api: ClientCRAuthorityOfficesService,
    private store: Store
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientCRAuthorityOfficesListData> {
    const clientId = Number(route.paramMap.get('clientId'));
    // prime lookups
    this.store.dispatch(loadAllAuthorityOffice({}));
    const authorityOffices = await firstValueFrom(
      this.store.select(selectAllAuthorityOffices)
    );
    // list for that client
    const items = await firstValueFrom(this.api.getByClientId(clientId));
    return { clientId, items, authorityOffices };
  }
}

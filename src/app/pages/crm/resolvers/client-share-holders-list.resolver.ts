import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Client } from '../clients/store/_clients/allclients/client.model';
import { ClientsService } from '../clients/store/_clients/allclients/clients.service';
import { ClientShareHolder } from '../clients/store/client-share-holders/client-share-holder.model';
import { ClientShareHoldersService } from '../clients/store/client-share-holders/client-share-holders.service';

export interface ClientShareHoldersListData {
  clientId: number;
  items: ClientShareHolder[];
  clients: Client[];
}

@Injectable({ providedIn: 'root' })
export class ClientShareHoldersListResolver
  implements Resolve<ClientShareHoldersListData>
{
  constructor(
    private shareHoldersApi: ClientShareHoldersService,
    private clientsApi: ClientsService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientShareHoldersListData> {
    const clientId = Number(route.paramMap.get('clientId'));
    const [items, clientsPaged] = await Promise.all([
      firstValueFrom(this.shareHoldersApi.getByClientId(clientId)),
      firstValueFrom(this.clientsApi.getAll()), // change to whatever returns a list of clients
    ]);
    const clients = clientsPaged; // clientsPaged is already Client[]
    return { clientId, items, clients };
  }
}

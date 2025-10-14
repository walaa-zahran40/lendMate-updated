import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Client } from '../clients/store/_clients/allclients/client.model';
import { ClientsService } from '../clients/store/_clients/allclients/clients.service';
import { ClientShareHolder } from '../clients/store/client-share-holders/client-share-holder.model';
import { ClientShareHoldersService } from '../clients/store/client-share-holders/client-share-holders.service';
export interface ClientShareHoldersBundle {
  mode: 'add' | 'edit' | 'view';
  record?: ClientShareHolder;
  clients: Client[];
  clientIdFromQP?: number;
}

@Injectable({ providedIn: 'root' })
export class ClientShareHoldersBundleResolver
  implements Resolve<ClientShareHoldersBundle>
{
  constructor(
    private shareHoldersApi: ClientShareHoldersService,
    private clientsApi: ClientsService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientShareHoldersBundle> {
    const mode =
      (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;

    const id = Number(route.paramMap.get('id')); // for edit/view
    const [clientsPaged, record] = await Promise.all([
      firstValueFrom(this.clientsApi.getAll()),
      mode !== 'add' && id
        ? firstValueFrom(this.shareHoldersApi.getById(id))
        : Promise.resolve(undefined),
    ]);
    const clients = clientsPaged;
    return { mode, record, clients, clientIdFromQP };
  }
}

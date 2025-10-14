import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll as loadCompanyTypes } from '../../lookups/store/company-types/company-types.actions';
import { loadAll as loadSMEClientCodes } from '../../lookups/store/sme-client-codes/sme-client-codes.actions';
import { selectAllCompanyTypes } from '../../lookups/store/company-types/company-types.selectors';
import { selectAllSMEClientCodes } from '../../lookups/store/sme-client-codes/sme-client-codes.selectors';
import { ClientCentralBankInfoService } from '../clients/store/client-central-bank-info/client-central-banks.service';

export interface ClientCentralBankInfoListData {
  clientId: number;
  items: any[];
  companyTypes: { id: number; name: string }[];
  smeClientCodes: { id: number; name: string }[];
}

@Injectable({ providedIn: 'root' })
export class ClientCentralBankInfoListResolver
  implements Resolve<ClientCentralBankInfoListData>
{
  constructor(
    private api: ClientCentralBankInfoService,
    private store: Store
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientCentralBankInfoListData> {
    const clientId = Number(route.paramMap.get('clientId'));

    // prime lookups
    this.store.dispatch(loadCompanyTypes({}));
    this.store.dispatch(loadSMEClientCodes({}));

    const [companyTypes, smeClientCodes] = await Promise.all([
      firstValueFrom(this.store.select(selectAllCompanyTypes)),
      firstValueFrom(this.store.select(selectAllSMEClientCodes)),
    ]);

    // list for the client
    const items = await firstValueFrom(this.api.getByClientId(clientId));

    return {
      clientId,
      items,
      companyTypes: companyTypes.map((ct) => ({
        id: ct.id,
        name: ct.name ?? '',
      })),
      smeClientCodes,
    };
  }
}

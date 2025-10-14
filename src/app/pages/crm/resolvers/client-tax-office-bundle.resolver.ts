import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll as loadAllTaxOffices } from '../../lookups/store/tax-offices/tax-offices.actions';
import { selectAllTaxOffices } from '../../lookups/store/tax-offices/tax-offices.selectors';
import { ClientTaxOfficesService } from '../clients/store/client-tax-office/client-tax-offices.service';

export interface ClientTaxOfficeBundle {
  mode: 'add' | 'edit' | 'view';
  clientIdFromQP?: number;
  record?: any; // when edit/view
  taxOffices: { id: number; name: string }[];
}

@Injectable({ providedIn: 'root' })
export class ClientTaxOfficeBundleResolver
  implements Resolve<ClientTaxOfficeBundle>
{
  constructor(private api: ClientTaxOfficesService, private store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ClientTaxOfficeBundle> {
    const mode = (route.queryParamMap.get('mode') as any) ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;

    // lookups
    this.store.dispatch(loadAllTaxOffices({}));
    const taxOffices = await firstValueFrom(
      this.store.select(selectAllTaxOffices)
    );

    if (mode === 'edit' || mode === 'view') {
      const id = Number(route.paramMap.get('id'));
      const record = await firstValueFrom(this.api.getById(id));
      return { mode, clientIdFromQP, record, taxOffices };
    }

    return { mode, clientIdFromQP, taxOffices };
  }
}

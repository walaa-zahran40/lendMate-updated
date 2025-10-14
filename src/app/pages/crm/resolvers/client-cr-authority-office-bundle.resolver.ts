import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll as loadAllAuthorityOffice } from '../../lookups/store/authority-offices/authority-offices.actions';
import { selectAllAuthorityOffices } from '../../lookups/store/authority-offices/authority-offices.selectors';
import { ClientCRAuthorityOfficesService } from '../clients/store/client-cr-authority-office/client-cr-authority-office.service';

export interface ClientCRAuthorityOfficeBundle {
  mode: 'add' | 'edit' | 'view';
  clientIdFromQP?: number;
  record?: any; // when edit/view
  authorityOffices: { id: number; name: string }[];
}

@Injectable({ providedIn: 'root' })
export class ClientCRAuthorityOfficeBundleResolver
  implements Resolve<ClientCRAuthorityOfficeBundle>
{
  constructor(
    private api: ClientCRAuthorityOfficesService,
    private store: Store
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot
  ): Promise<ClientCRAuthorityOfficeBundle> {
    const mode = (route.queryParamMap.get('mode') as any) ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;

    // lookups
    this.store.dispatch(loadAllAuthorityOffice({}));
    const authorityOffices = await firstValueFrom(
      this.store.select(selectAllAuthorityOffices)
    );

    if (mode === 'edit' || mode === 'view') {
      const id = Number(route.paramMap.get('id'));
      const record = await firstValueFrom(this.api.getById(id));
      return { mode, clientIdFromQP, record, authorityOffices };
    }

    return { mode, clientIdFromQP, authorityOffices };
  }
}

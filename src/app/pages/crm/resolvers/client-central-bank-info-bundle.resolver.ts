import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {
  filter,
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll as loadCompanyTypes } from '../../lookups/store/company-types/company-types.actions';
import { selectAllCompanyTypes } from '../../lookups/store/company-types/company-types.selectors';
import { loadAll as loadSMEClientCodes } from '../../lookups/store/sme-client-codes/sme-client-codes.actions';
import { selectAllSMEClientCodes } from '../../lookups/store/sme-client-codes/sme-client-codes.selectors';
import { ClientCentralBankInfoService } from '../clients/store/client-central-bank-info/client-central-banks.service';
import { AppState } from '../../../shared/store/ui-state.reducer';
import { CompanyType } from '../../lookups/store/company-types/company-type.model';
import { SMEClientCode } from '../../lookups/store/sme-client-codes/sme-client-code.model';

export interface ClientCentralBankInfoBundle {
  mode: 'add' | 'edit' | 'view';
  clientIdFromQP?: number;
  record?: any; // present for edit/view
  companyTypes: { id: number; name: string }[];
  smeClientCodes: { id: number; name: string }[];
}

@Injectable({ providedIn: 'root' })
export class ClientCentralBankInfoBundleResolver
  implements Resolve<ClientCentralBankInfoBundle>
{
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ClientCentralBankInfoBundle> {
    const mode =
      (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
    const clientIdFromQPStr = route.queryParamMap.get('clientId');
    const clientIdFromQP =
      clientIdFromQPStr !== null ? Number(clientIdFromQPStr) : undefined;

    const companyTypes$ = this.ensureCompanyTypesLoaded();
    const smeCodes$ = this.ensureSMECodesLoaded();
    const record$ = of(null); // or load your record here

    return forkJoin({
      companyTypes: companyTypes$,
      smeClientCodes: smeCodes$,
      record: record$,
    }).pipe(
      tap((res) => console.log('🧳 Resolver forkJoin result:', res)),
      take(1),
      map(
        (res) =>
          ({ ...res, mode, clientIdFromQP } as ClientCentralBankInfoBundle)
      )
    );
  }

  private ensureCompanyTypesLoaded(): Observable<CompanyType[]> {
    return this.store.select(selectAllCompanyTypes).pipe(
      tap((list) => {
        if (!list || list.length === 0) {
          console.log('📥 dispatch loadCompanyTypes() from resolver');
          this.store.dispatch(loadCompanyTypes({}));
        }
      }),
      // If you have a "loaded" selector, prefer to wait on it instead of length:
      // combineLatest([this.store.select(selectAllCompanyTypes), this.store.select(selectCompanyTypesLoaded)]).pipe(...)
      filter((list) => Array.isArray(list) && list.length > 0),
      take(1)
    );
  }

  private ensureSMECodesLoaded(): Observable<SMEClientCode[]> {
    return this.store.select(selectAllSMEClientCodes).pipe(
      tap((list) => {
        if (!list || list.length === 0) {
          console.log('📥 dispatch loadSMEClientCodes() from resolver');
          this.store.dispatch(loadSMEClientCodes({}));
        }
      }),
      filter((list) => Array.isArray(list) && list.length > 0),
      take(1)
    );
  }
}

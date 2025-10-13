import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import { filter, take, catchError, map } from 'rxjs/operators';

// Lookups selectors & actions
import { loadCountries } from '../../lookups/store/countries/countries.actions';
import { selectAllCountries } from '../../lookups/store/countries/countries.selectors';
import { loadGovernorates } from '../../lookups/store/governorates/governorates.actions';
import { selectAllGovernorates } from '../../lookups/store/governorates/governorates.selectors';
import { loadAreas } from '../../lookups/store/areas/areas.actions';
import { selectAllAreas } from '../../lookups/store/areas/areas.selectors';
import { loadAll as loadAddressTypes } from '../../lookups/store/address-types/address-types.actions';
import { selectAllAddressTypes } from '../../lookups/store/address-types/address-types.selectors';
import { ClientAddress } from '../clients/store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../clients/store/client-addresses/client-addresses.facade';

// Entity facade & model
export interface ClientAddressBundle {
  mode: 'add' | 'edit' | 'view';
  clientIdFromQP?: number | null; // ?clientId=...
  record?: ClientAddress | null; // when editing/viewing
  countries: any[];
  governorates: any[];
  areas: any[];
  addressTypes: any[];
}

export const clientAddressBundleResolver: ResolveFn<ClientAddressBundle> = (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const addressFacade = inject(ClientAddressesFacade);

  // mode & ids
  const mode =
    (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
  const clientIdFromQP = route.queryParamMap.get('clientId')
    ? Number(route.queryParamMap.get('clientId'))
    : null;

  const idParam = route.paramMap.get('id');
  const recordId = idParam != null ? Number(idParam) : NaN;

  // Load lookups (idempotent)
  store.dispatch(loadCountries({}));
  store.dispatch(loadGovernorates({}));
  store.dispatch(loadAreas({}));
  store.dispatch(loadAddressTypes({}));

  const countries$ = store.select(selectAllCountries).pipe(
    filter((l) => l.length > 0),
    take(1)
  );
  const governorates$ = store.select(selectAllGovernorates).pipe(
    filter((l) => l.length > 0),
    take(1)
  );
  const areas$ = store.select(selectAllAreas).pipe(
    filter((l) => l.length > 0),
    take(1)
  );
  const addressTypes$ = store.select(selectAllAddressTypes).pipe(
    filter((l) => l.length > 0),
    take(1)
  );

  // If editing/viewing, trigger record load & wait
  const record$ = Number.isFinite(recordId)
    ? (() => {
        addressFacade.loadOne(recordId);
        return addressFacade.current$.pipe(
          filter((ct) => !!ct && ct.id === recordId),
          take(1)
        );
      })()
    : of(null);

  return forkJoin({
    countries: countries$,
    governorates: governorates$,
    areas: areas$,
    addressTypes: addressTypes$,
    record: record$,
  }).pipe(
    map(
      ({ countries, governorates, areas, addressTypes, record }) =>
        ({
          mode,
          clientIdFromQP,
          record,
          countries,
          governorates,
          areas,
          addressTypes,
        } as ClientAddressBundle)
    ),
    catchError(() =>
      of({
        mode,
        clientIdFromQP,
        record: null,
        countries: [],
        governorates: [],
        areas: [],
        addressTypes: [],
      } as ClientAddressBundle)
    )
  );
};

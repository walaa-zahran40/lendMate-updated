import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AddressType } from '../../../lookups/store/address-types/address-type.model';
import { AddressTypesService } from '../../../lookups/store/address-types/address-types.service';
import { Area } from '../../../lookups/store/areas/area.model';
import { AreasService } from '../../../lookups/store/areas/areas.service';
import { CountriesService } from '../../../lookups/store/countries/countries.service';
import { Country } from '../../../lookups/store/countries/country.model';
import { Governorate } from '../../../lookups/store/governorates/governorate.model';
import { GovernoratesService } from '../../../lookups/store/governorates/governorates.service';
import { IdentificationType } from '../../../lookups/store/identification-types/identification-type.model';
import { IdentificationTypesService } from '../../../lookups/store/identification-types/identification-types.service';
import { PhoneType } from '../../../lookups/store/phone-types/phone-type.model';
import { PhoneTypesService } from '../../../lookups/store/phone-types/phone-types.service';
import { ClientContactPerson } from '../store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsService } from '../store/client-contact-persons/client-contact-persons.service';

export interface ContactPersonsBundle {
  mode: 'add' | 'edit' | 'view';
  record?: ClientContactPerson;
  clientIdFromQP?: number;
  addressTypes: AddressType[];
  countries: Country[];
  governorates: Governorate[];
  areas: Area[];
  phoneTypes: PhoneType[];
  identityTypes: IdentificationType[];
}

@Injectable({ providedIn: 'root' })
export class ContactPersonsBundleResolver
  implements Resolve<ContactPersonsBundle>
{
  constructor(
    private api: ClientContactPersonsService,
    private addressTypesApi: AddressTypesService,
    private countriesApi: CountriesService,
    private governoratesApi: GovernoratesService,
    private areasApi: AreasService,
    private phoneTypesApi: PhoneTypesService,
    private idTypesApi: IdentificationTypesService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ContactPersonsBundle> {
    const mode =
      (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;

    // NOTE: your edit route is `edit-contact-person/:clientId` (where :clientId is actually the record id)
    const recordId = Number(route.paramMap.get('clientId'));

    const [
      addressTypesPaged,
      countriesPaged,
      governoratesPaged,
      areasPaged,
      phoneTypesPaged,
      identityTypesPaged,
      record,
    ] = await Promise.all([
      firstValueFrom(this.addressTypesApi.getAll()),
      firstValueFrom(this.countriesApi.getAll()),
      firstValueFrom(this.governoratesApi.getAll()),
      firstValueFrom(this.areasApi.getAll()),
      firstValueFrom(this.phoneTypesApi.getAll()),
      firstValueFrom(this.idTypesApi.getAll()),
      mode !== 'add' && recordId
        ? firstValueFrom(this.api.getById(recordId))
        : Promise.resolve(undefined),
    ]);

    const unwrap = (x: any) => x?.items ?? x;

    return {
      mode,
      record,
      clientIdFromQP,
      addressTypes: unwrap(addressTypesPaged),
      countries: unwrap(countriesPaged),
      governorates: unwrap(governoratesPaged),
      areas: unwrap(areasPaged),
      phoneTypes: unwrap(phoneTypesPaged),
      identityTypes: unwrap(identityTypesPaged),
    };
  }
}

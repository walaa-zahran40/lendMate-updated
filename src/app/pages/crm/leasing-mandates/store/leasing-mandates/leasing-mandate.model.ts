import { AssetType } from '../../../../lookups/store/asset-types/asset-type.model';
import { FeeType } from '../../../../lookups/store/fee-types/fee-type.model';
import { PeriodUnit } from '../../../../lookups/store/period-units/period-unit.model';
import { Officer } from '../../../../organizations/store/officers/officer.model';
import { ClientContactPerson } from '../../../clients/store/client-contact-persons/client-contact-person.model';

export interface Mandate {
  id?: number;
  description?: string;
  date?: Date;
  clientId?: number;
  parentMandateId?: number;
  validityCount?: number;
  validityUnitId?: number;
  notes?: string;
  productId?: number;
  indicativeRentals?: number;
  leasingTypeId?: number;
  insuredById?: number;
  mandateAssetTypes?: AssetType;
  mandateContactPersons?: ClientContactPerson;
  mandateOfficers?: Officer;
  mandateFees?: FeeType;
  mandateGracePeriodSetting?: PeriodUnit;
}

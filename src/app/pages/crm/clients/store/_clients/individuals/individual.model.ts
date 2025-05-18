import { ClientIdentity } from '../../../../../../shared/interfaces/client-identity.interface';
import { SubSector } from '../../../../../lookups/store/sub-sectors/sub-sector.model';

export interface Individual {
  id: number;
  name?: string;
  nameAR?: string;
  businessActivity?: string;
  shortName?: string;
  birthDate?: string;
  email?: string;
  jobTitle?: string;
  genderId?: number;
  clientId?: number;
  subSectorList?: SubSector[];
  clientIdentities?: ClientIdentity[];
}

export interface IndividualState {
  selectedIndividual: Individual | null;
  individuals: Individual[];
  loading: boolean;
  error: string | null;
}
export interface Individual {
  id: number;
  name: string;
  nameAR: string;
  shortName: string;
  businessActivity: string;
  birthDate: string;
  email: string;
  jobTitle: string;
  genderId: number;
  clientTypeId: number;
  subSectorIdList: number[];
  clientIdentities: {
    id?: number;
    identificationNumber: string;
    clientIdentityTypeId: number | null;
    isMain: boolean;
  }[];
}

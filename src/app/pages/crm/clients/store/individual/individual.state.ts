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
  subSectorList: {
    id: number;
    name: string;
    nameAR: string;
    sectorId: number;
  }[];
  clientIdentities: {
    id?: number;
    identificationNumber: string;
    clientIdentityTypeId: number;
    isMain: boolean;
  }[];
}

export interface IndividualState {
  individuals: Individual[];
  totalCount: number;
  selectedIndividual: Individual | null;
  loading: boolean;
  error: any;
}

export const initialIndividualState: IndividualState = {
  individuals: [],
  totalCount: 0,
  selectedIndividual: null,
  loading: false,
  error: null,
};

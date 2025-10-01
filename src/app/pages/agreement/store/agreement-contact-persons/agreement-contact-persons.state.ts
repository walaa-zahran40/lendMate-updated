import { AgreementContactPerson } from './agreement-contact-person.model';

export interface AgreementContactPersonsState {
  items: AgreementContactPerson[];
  history: AgreementContactPerson[];
  current?: AgreementContactPerson;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialAgreementContactPersonsState: AgreementContactPersonsState =
  {
    items: [],
    history: [],
    current: undefined,
    loading: false,
    error: null,
    totalCount: 0,
  };

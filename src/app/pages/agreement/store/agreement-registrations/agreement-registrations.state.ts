import { AgreementRegistration } from './agreement-registration.model';

export interface AgreementRegistrationsState {
  items: AgreementRegistration[];
  history: AgreementRegistration[];
  current?: AgreementRegistration;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialAgreementRegistrationsState: AgreementRegistrationsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

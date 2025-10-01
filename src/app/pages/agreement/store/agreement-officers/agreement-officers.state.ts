import { AgreementOfficer } from './agreement-officer.model';

export interface AgreementOfficersState {
  items: AgreementOfficer[];
  history: AgreementOfficer[];
  current?: AgreementOfficer;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialAgreementOfficersState: AgreementOfficersState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

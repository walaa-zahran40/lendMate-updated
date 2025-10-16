import { LegalFormLaw } from './legal-form-law.model';

export interface LegalFormLawsState {
  items: LegalFormLaw[];
  history: LegalFormLaw[];
  current?: LegalFormLaw;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialLegalFormLawsState: LegalFormLawsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

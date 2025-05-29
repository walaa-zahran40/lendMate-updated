import { MandateAdditionalTerm } from './mandate-additional-term.model';

export interface MandateAdditionalTermsState {
  items: MandateAdditionalTerm[];
  history: MandateAdditionalTerm[];
  current?: MandateAdditionalTerm;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialMandateAdditionalTermsState: MandateAdditionalTermsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

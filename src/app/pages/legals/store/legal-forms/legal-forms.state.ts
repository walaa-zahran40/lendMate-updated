import { LegalForm } from './legal-form.model';

export interface LegalFormsState {
  items: LegalForm[];
  history: LegalForm[];
  current?: LegalForm;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialLegalFormsState: LegalFormsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

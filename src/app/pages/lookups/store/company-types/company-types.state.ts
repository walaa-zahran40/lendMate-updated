import { CompanyType } from './company-type.model';

export interface CompanyTypesState {
  items: CompanyType[];
  history: CompanyType[];
  current?: CompanyType;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialCompanyTypesState: CompanyTypesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

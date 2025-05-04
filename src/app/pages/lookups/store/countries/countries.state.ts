import { Country } from './country.model';

export interface CountriesState {
  items: Country[];
  history: Country[];
  current?: Country;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialCountriesState: CountriesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

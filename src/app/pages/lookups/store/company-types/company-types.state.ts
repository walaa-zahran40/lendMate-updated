import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CompanyType } from './company-type.model';

export interface State extends EntityState<CompanyType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: CompanyType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<CompanyType> =
  createEntityAdapter<CompanyType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});

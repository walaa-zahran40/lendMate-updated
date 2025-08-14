import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LicenseType } from './license-type.model';

export interface State extends EntityState<LicenseType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: LicenseType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<LicenseType> =
  createEntityAdapter<LicenseType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});

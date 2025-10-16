import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LicenseInformation } from './license-information.model';

export interface State extends EntityState<LicenseInformation> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: LicenseInformation[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<LicenseInformation> =
  createEntityAdapter<LicenseInformation>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});

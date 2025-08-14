import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LicenseProvider } from './license-provider.model';

export interface State extends EntityState<LicenseProvider> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: LicenseProvider[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<LicenseProvider> =
  createEntityAdapter<LicenseProvider>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});

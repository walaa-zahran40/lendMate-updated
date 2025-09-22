import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateOfficer } from './mandate-officer.model';

export interface State extends EntityState<MandateOfficer> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandateOfficer> =
  createEntityAdapter<MandateOfficer>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

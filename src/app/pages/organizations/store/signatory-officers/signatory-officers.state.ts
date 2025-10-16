import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SignatoryOfficer } from './signatory-officer.model';

export interface State extends EntityState<SignatoryOfficer> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<SignatoryOfficer> = createEntityAdapter<SignatoryOfficer>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

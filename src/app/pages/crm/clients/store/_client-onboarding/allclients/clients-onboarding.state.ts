import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientOnboarding } from './client-onboarding.model';

export interface State extends EntityState<ClientOnboarding> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<ClientOnboarding> =
  createEntityAdapter<ClientOnboarding>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

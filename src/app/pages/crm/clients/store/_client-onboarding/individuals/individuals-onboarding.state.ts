import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IndividualOnboarding } from './individual-onboarding.model';

export interface State extends EntityState<IndividualOnboarding> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<IndividualOnboarding> =
  createEntityAdapter<IndividualOnboarding>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

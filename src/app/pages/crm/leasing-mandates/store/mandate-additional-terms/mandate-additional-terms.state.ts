import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateAdditionalTerm } from './mandate-additional-term.model';

export interface State extends EntityState<MandateAdditionalTerm> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandateAdditionalTerm> =
  createEntityAdapter<MandateAdditionalTerm>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Mandate, MandateWorkFlowHistory } from './leasing-mandate.model';

export interface State extends EntityState<Mandate> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export interface State extends EntityState<Mandate> {
  loadedId: number | null;
  loading: boolean;
  error: string | null;
  workflowHistory: MandateWorkFlowHistory[]; // ✅ NEW
}

export const adapter: EntityAdapter<Mandate> = createEntityAdapter<Mandate>();

export const initialState: State = adapter.getInitialState({
  loadedId: null,
  loading: false,
  error: null,
  workflowHistory: [], // ✅ NEW
});

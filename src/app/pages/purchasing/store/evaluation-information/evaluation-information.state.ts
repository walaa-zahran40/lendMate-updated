import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EvaluationInformation } from './evaluation-information.model';

export interface State extends EntityState<EvaluationInformation> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: EvaluationInformation[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<EvaluationInformation> =
  createEntityAdapter<EvaluationInformation>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ConditionExpression } from './condition-expression.model';

export interface State extends EntityState<ConditionExpression> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: ConditionExpression[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<ConditionExpression> =
  createEntityAdapter<ConditionExpression>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});

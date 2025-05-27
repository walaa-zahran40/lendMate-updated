import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ConditionExpression } from './condition-expressions.model';

export interface State extends EntityState<ConditionExpression> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<ConditionExpression> =
  createEntityAdapter<ConditionExpression>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

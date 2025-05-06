import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WorkflowActionType } from './workflow-action-type.model';

export interface State extends EntityState<WorkflowActionType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<WorkflowActionType> =
  createEntityAdapter<WorkflowActionType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

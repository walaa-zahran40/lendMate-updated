import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BusinessLine } from './business-line.model';

export interface State extends EntityState<BusinessLine> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<BusinessLine> =
  createEntityAdapter<BusinessLine>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

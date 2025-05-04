import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PeriodUnit } from './period-unit.model';

export interface State extends EntityState<PeriodUnit> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<PeriodUnit> =
  createEntityAdapter<PeriodUnit>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

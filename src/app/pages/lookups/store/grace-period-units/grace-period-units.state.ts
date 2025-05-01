import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GracePeriodUnit } from './grace-period-unit.model';

export interface State extends EntityState<GracePeriodUnit> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<GracePeriodUnit> =
  createEntityAdapter<GracePeriodUnit>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

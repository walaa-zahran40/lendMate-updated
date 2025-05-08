import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandateValidityUnit } from './mandate-validity-unit.model';

export interface State extends EntityState<MandateValidityUnit> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandateValidityUnit> =
  createEntityAdapter<MandateValidityUnit>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

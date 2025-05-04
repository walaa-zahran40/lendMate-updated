import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LeasingType } from './leasing-type.model';

export interface State extends EntityState<LeasingType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<LeasingType> =
  createEntityAdapter<LeasingType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

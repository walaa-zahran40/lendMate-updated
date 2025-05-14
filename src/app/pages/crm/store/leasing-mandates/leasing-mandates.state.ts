import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LeasingMandate } from './leasing-mandate.model';

export interface State extends EntityState<LeasingMandate> {
  loadedId: number | null; 
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<LeasingMandate> = createEntityAdapter<LeasingMandate>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, 
  loading: false,
  error: null,
});

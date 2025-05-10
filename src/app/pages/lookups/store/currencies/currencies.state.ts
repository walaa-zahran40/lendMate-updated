import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Currency } from './currency.model';

export interface State extends EntityState<Currency> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Currency> = createEntityAdapter<Currency>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

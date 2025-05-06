import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TaxOffice } from './tax_offices.model';

export interface State extends EntityState<TaxOffice> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<TaxOffice> =
  createEntityAdapter<TaxOffice>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

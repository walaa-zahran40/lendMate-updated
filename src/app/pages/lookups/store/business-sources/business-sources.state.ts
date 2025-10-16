import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BusinessSource } from './business-source.model';

export interface State extends EntityState<BusinessSource> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: BusinessSource[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<BusinessSource> =
  createEntityAdapter<BusinessSource>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Asset } from './asset.model';

export interface State extends EntityState<Asset> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Asset[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Asset> = createEntityAdapter<Asset>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});

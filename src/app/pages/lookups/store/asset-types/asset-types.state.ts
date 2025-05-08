import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssetType } from './asset-type.model';

export interface State extends EntityState<AssetType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<AssetType> =
  createEntityAdapter<AssetType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

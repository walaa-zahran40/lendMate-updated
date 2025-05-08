import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AssetTypeCategory } from './asset-type-category.model';

export interface State extends EntityState<AssetTypeCategory> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<AssetTypeCategory> =
  createEntityAdapter<AssetTypeCategory>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

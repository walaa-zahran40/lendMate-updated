import { AssetType } from './asset-type.model';

export interface AssetTypesState {
  items: AssetType[];
  history: AssetType[];
  current?: AssetType;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialAssetTypesState: AssetTypesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

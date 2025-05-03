import { AssetTypeCategory } from './asset-type-category.model';

export interface AssetTypeCategoriesState {
  items: AssetTypeCategory[];
  history: AssetTypeCategory[];
  current?: AssetTypeCategory;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialAssetTypeCategoriesState: AssetTypeCategoriesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};

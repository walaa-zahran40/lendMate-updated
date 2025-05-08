import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './asset-type-categories.actions';
import * as Selectors from './asset-type-categories.selectors';
import { AssetTypeCategory } from './asset-type-category.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class AssetTypeCategoriesFacade {
  all$ = this.store.select(Selectors.selectAllAssetTypeCategories);
  loading$ = this.store.select(Selectors.selectAssetTypeCategoriesLoading);
  error$ = this.store.select(Selectors.selectAssetTypeCategoriesError);
  totalCount$ = this.store.select(
    Selectors.selectAssetTypeCategoriesTotalCount
  );
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<AssetTypeCategory, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<AssetTypeCategory>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './asset-type-categories.actions';
import * as Selectors from './asset-type-categories.selectors';
import { Observable } from 'rxjs';
import { AssetTypeCategory } from './asset-type-category.model';

@Injectable({ providedIn: 'root' })
export class AssetTypeCategoriesFacade {
  items$: Observable<AssetTypeCategory[]> = this.store.select(
    Selectors.selectAssetTypeCategories
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectAssetTypeCategoriesTotal
  );
  history$: Observable<AssetTypeCategory[]> = this.store.select(
    Selectors.selectAssetTypeCategoriesHistory
  );
  current$: Observable<AssetTypeCategory | undefined> = this.store.select(
    Selectors.selectCurrentAssetTypeCategory
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectAssetTypeCategoriesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectAssetTypeCategoriesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAssetTypeCategories());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadAssetTypeCategoriesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadAssetTypeCategory({ id }));
  }
  create(data: Partial<AssetTypeCategory>) {
    this.store.dispatch(Actions.createAssetTypeCategory({ data }));
  }
  update(id: any, data: Partial<AssetTypeCategory>) {
    this.store.dispatch(Actions.updateAssetTypeCategory({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteAssetTypeCategory({ id }));
  }
}
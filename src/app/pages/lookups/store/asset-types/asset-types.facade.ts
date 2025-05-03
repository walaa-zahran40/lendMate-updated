import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './asset-types.actions';
import * as Selectors from './asset-types.selectors';
import { Observable } from 'rxjs';
import { AssetType } from './asset-type.model';

@Injectable({ providedIn: 'root' })
export class AssetTypesFacade {
  items$: Observable<AssetType[]> = this.store.select(
    Selectors.selectAssetTypes
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectAssetTypesTotal
  );
  history$: Observable<AssetType[]> = this.store.select(
    Selectors.selectAssetTypesHistory
  );
  current$: Observable<AssetType | undefined> = this.store.select(
    Selectors.selectCurrentAssetType
  );
  
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectAssetTypesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectAssetTypesError
  );

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadAssetTypes());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadAssetTypesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadAssetType({ id }));
  }
  create(data: Partial<AssetType>) {
    this.store.dispatch(Actions.createAssetType({ data }));
  }
  update(id: any, data: Partial<AssetType>) {
    this.store.dispatch(Actions.updateAssetType({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteAssetType({ id }));
  }
}
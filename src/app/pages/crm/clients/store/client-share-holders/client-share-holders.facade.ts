import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ShareholderActions from './client-share-holders.actions';
import * as ShareholderSelectors from './client-share-holders.selectors';
import { Observable } from 'rxjs';
import { Shareholder } from './client-share-holders.model';

@Injectable({ providedIn: 'root' })
export class ClientShareholdersFacade {
  shareholders$: Observable<Shareholder[]> = this.store.select(
    ShareholderSelectors.selectShareholders
  );
  allShareholders$: Observable<Shareholder[]> = this.store.select(
    ShareholderSelectors.selectAllShareholders
  );
  history$: Observable<any[]> = this.store.select(
    ShareholderSelectors.selectShareholdersHistory
  );
  loading$: Observable<boolean> = this.store.select(
    ShareholderSelectors.selectLoading
  );
  error$: Observable<any> = this.store.select(ShareholderSelectors.selectError);

  constructor(private store: Store) {}

  loadShareholders(clientId: number) {
    this.store.dispatch(ShareholderActions.loadShareholders({ clientId }));
  }

  loadAllShareholders() {
    this.store.dispatch(ShareholderActions.loadAllShareholders());
  }

  createShareholder(shareholder: Shareholder) {
    this.store.dispatch(ShareholderActions.createShareholder({ shareholder }));
  }

  updateShareholder(id: number, shareholder: Shareholder) {
    this.store.dispatch(
      ShareholderActions.updateShareholder({ id, shareholder })
    );
  }

  deleteShareholder(id: number) {
    this.store.dispatch(ShareholderActions.deleteShareholder({ id }));
  }

  loadHistory() {
    this.store.dispatch(ShareholderActions.loadShareholdersHistory());
  }
}

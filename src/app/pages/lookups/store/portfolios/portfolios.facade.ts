import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './portfolios.actions';
import * as Selectors from './portfolios.selectors';
import { Portfolio } from './portfolio.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class PortfoliosFacade {
  all$ = this.store.select(Selectors.selectAllPortfolios);
  loading$ = this.store.select(Selectors.selectPortfoliosLoading);
  error$ = this.store.select(Selectors.selectPortfoliosError);
  totalCount$ = this.store.select(Selectors.selectPortfoliosTotalCount);
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

  create(payload: Partial<Omit<Portfolio, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Portfolio>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  // History management
  readonly portfolioHistory$ = this.store.select(Selectors.selectHistory);
  readonly portfolioHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadPortfolioHistory());
  }
}

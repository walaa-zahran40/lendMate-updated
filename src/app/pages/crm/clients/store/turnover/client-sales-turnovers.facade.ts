import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TurnoverActions from './client-sales-turnovers.actions';
import * as TurnoverSelectors from './client-sales-turnovers.selectors';
import { ClientSalesTurnover } from './client-sales-turnover.model';

@Injectable({ providedIn: 'root' })
export class ClientSalesTurnoversFacade {
  all$ = this.store.select(TurnoverSelectors.selectAllClientSalesTurnovers);
  totalCount$ = this.store.select(
    TurnoverSelectors.selectClientSalesTurnoversTotalCount
  );
  loading$ = this.store.select(
    TurnoverSelectors.selectClientSalesTurnoversLoading
  );

  constructor(private store: Store) {}

  loadAll(page: number) {
    this.store.dispatch(
      TurnoverActions.loadClientSalesTurnovers({ pageNumber: page })
    );
  }

  loadHistory() {
    this.store.dispatch(TurnoverActions.loadClientTurnoverHistory());
  }

  create(turnover: Partial<ClientSalesTurnover>) {
    this.store.dispatch(
      TurnoverActions.createClientSalesTurnover({ turnover })
    );
  }

  update(id: number, changes: Partial<ClientSalesTurnover>) {
    this.store.dispatch(
      TurnoverActions.updateClientSalesTurnover({ id, changes })
    );
  }

  delete(id: number) {
    this.store.dispatch(TurnoverActions.deleteClientSalesTurnover({ id }));
  }
}

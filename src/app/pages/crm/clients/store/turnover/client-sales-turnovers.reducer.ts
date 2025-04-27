import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TurnoverActions from './client-sales-turnovers.actions';
import { ClientSalesTurnover } from './client-sales-turnover.model';

export const clientSalesTurnoversFeatureKey = 'clientSalesTurnovers';

export interface State extends EntityState<ClientSalesTurnover> {
  loading: boolean;
  error: any;
  totalCount: number;
}

export const adapter: EntityAdapter<ClientSalesTurnover> =
  createEntityAdapter<ClientSalesTurnover>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  totalCount: 0,
});

export const reducer = createReducer(
  initialState,
  on(TurnoverActions.loadClientSalesTurnovers, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    TurnoverActions.loadClientSalesTurnoversSuccess,
    (state, { items, totalCount }) =>
      adapter.setAll(items, { ...state, loading: false, totalCount })
  ),
  on(TurnoverActions.loadClientSalesTurnoversFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // History actions (could use separate adapter or merge)
  on(TurnoverActions.loadClientTurnoverHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(TurnoverActions.loadClientTurnoverHistorySuccess, (state, { items }) =>
    adapter.setAll(items, { ...state, loading: false })
  ),
  on(TurnoverActions.loadClientTurnoverHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TurnoverActions.createClientSalesTurnoverSuccess, (state, { turnover }) =>
    adapter.addOne(turnover, state)
  ),
  on(TurnoverActions.updateClientSalesTurnoverSuccess, (state, { turnover }) =>
    adapter.upsertOne(turnover, state)
  ),
  on(TurnoverActions.deleteClientSalesTurnoverSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

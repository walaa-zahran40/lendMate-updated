import { createReducer, on } from '@ngrx/store';
import * as Actions from './action-authorization-groups.actions';
import {
  adapter,
  initialMandateActionAuthorizationGroupsState,
} from './action-authorization-groups.state';

export const mandateActionAuthorizationGroupsReducer = createReducer(
  initialMandateActionAuthorizationGroupsState,
  on(Actions.loadMandateActionAuthorizationGroups, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadMandateActionAuthorizationGroupsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupsFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),

  on(Actions.loadMandateActionAuthorizationGroupsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.loadMandateActionAuthorizationGroupsHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      loading: false,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupsHistoryFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),

  on(Actions.loadMandateActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.loadMandateActionAuthorizationGroupSuccess,
    (state, { mandate }) => ({
      ...state,
      current: mandate,
      loading: false,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),

  on(Actions.createMandateActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.createMandateActionAuthorizationGroupSuccess,
    (state, { mandate }) => ({
      ...state,
      items: [...state.items, mandate],
      loading: false,
    })
  ),
  on(
    Actions.createMandateActionAuthorizationGroupFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),

  on(Actions.updateMandateActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    Actions.updateMandateActionAuthorizationGroupSuccess,
    (state, { mandate }) => ({
      ...state,
      items: state.items.map((ct) => (ct.id === mandate.id ? mandate : ct)),
      loading: false,
    })
  ),
  on(
    Actions.updateMandateActionAuthorizationGroupFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),

  on(Actions.deleteMandateActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteMandateActionAuthorizationGroupSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(
    Actions.deleteMandateActionAuthorizationGroupFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupsByMandateStatusActionId,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupsByMandateStatusActionIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupsByMandateStatusActionIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  //History management
  on(Actions.loadMandateActionAuthorizationGroupHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    Actions.loadMandateActionAuthorizationGroupHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    Actions.loadMandateActionAuthorizationGroupHistorySuccess,
    (state, { history }) => {
      console.log('✅ Reducer: history loaded', history); // add this
      return {
        ...state,
        history: [...history],
        historyLoaded: true,
      };
    }
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

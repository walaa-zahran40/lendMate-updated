import { createReducer, on } from '@ngrx/store';
import * as NotificationGroupOfficerActions from './notification-group-officers.actions';
import { adapter, initialState } from './notification-group-officers.state';

export const notificationGroupOfficerReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(NotificationGroupOfficerActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(NotificationGroupOfficerActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(NotificationGroupOfficerActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(NotificationGroupOfficerActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NotificationGroupOfficerActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(NotificationGroupOfficerActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(NotificationGroupOfficerActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NotificationGroupOfficerActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(NotificationGroupOfficerActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(NotificationGroupOfficerActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NotificationGroupOfficerActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(NotificationGroupOfficerActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identCompanyActionType-types.reducer.ts
  on(NotificationGroupOfficerActions.loadByIdSuccess, (state, { entity }) => {
    console.log('🗄️ Reducer: loadByIdSuccess, before:', {
      loadedId: state.loadedId,
      entities: state.entities,
    });

    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id,
    });

    console.log('🗄️ Reducer: loadByIdSuccess, after:', {
      loadedId: newState.loadedId,
      entities: newState.entities,
    });

    return newState;
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

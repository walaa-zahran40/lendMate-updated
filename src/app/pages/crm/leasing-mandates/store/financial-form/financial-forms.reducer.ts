import { createReducer, on } from '@ngrx/store';
import * as FinancialFormActions from './financial-forms.actions';
import { adapter, initialState, State } from './financial-forms.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(FinancialFormActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(FinancialFormActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(FinancialFormActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(FinancialFormActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FinancialFormActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(FinancialFormActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(FinancialFormActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FinancialFormActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(FinancialFormActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(FinancialFormActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FinancialFormActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(FinancialFormActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(FinancialFormActions.loadByIdSuccess, (state, { entity }) => {
    console.log('🗄️ Reducer: loadByIdSuccess, before:', {
      loadedId: state.loadedId,
      entities: state.entities,
    });

    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id ?? null,
    });

    console.log('🗄️ Reducer: loadByIdSuccess, after:', {
      loadedId: newState.loadedId,
      entities: newState.entities,
    });

    return newState;
  }),
  on(
    FinancialFormActions.loadByLeasingMandateIdSuccess,
    (state, { entity }) => {
      const newState = adapter.upsertOne(entity, {
        ...state,
        loadedId: entity.id ?? null,
      });
      console.log('📥 Reducer: Stored entity + loadedId =', entity.id);
      return newState;
    }
  ),
  on(FinancialFormActions.clearSelectedFinancialForm, (state) => ({
    ...state,
    loadedId: null,
  })),
  // ─── Calculate Success ──────────────────────────────────────────────────
  on(FinancialFormActions.calculateEntitySuccess, (state, { rows }) => ({
    ...state,
    calculatedRows: rows,
    loading: false,
    error: null,
  })),

  // ─── Create Success ─────────────────────────────────────────────────────
  on(FinancialFormActions.createEntitySuccess, (state, { entity }) => {
    const mandateId = entity.leasingMandateId!;
    const rows = entity.payments ?? []; // ← same array on create
    return {
      ...state,
      calculatedRowsByMandate: {
        ...state.calculatedRowsByMandate,
        [mandateId]: rows,
      },
    };
  }),
  on(FinancialFormActions.loadCalcConfig, (state) => ({
    ...state,
    calcConfigLoading: true,
    calcConfigError: null,
  })),
  on(FinancialFormActions.loadCalcConfigSuccess, (state, { config }) => ({
    ...state,
    calcConfig: config,
    calcConfigLoading: false,
  })),
  on(FinancialFormActions.loadCalcConfigFailure, (state, { error }) => ({
    ...state,
    calcConfigLoading: false,
    calcConfigError: error,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as ContactPersonActions from './contact-person.actions';
import { ContactPerson } from './contact-person.model';

export const contactPersonsFeatureKey = 'contactPersons';

export interface State extends EntityState<ContactPerson> {
  loading: boolean;
  error: any;
  totalCount: number;
}

export const adapter: EntityAdapter<ContactPerson> =
  createEntityAdapter<ContactPerson>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  totalCount: 0,
});

export const contactPersonsReducer = createReducer(
  initialState,

  // Load All
  on(ContactPersonActions.loadContactPersons, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ContactPersonActions.loadContactPersonsSuccess, (state, { response }) =>
    adapter.setAll(response.items, {
      ...state,
      loading: false,
      totalCount: response.totalCount,
    })
  ),
  on(ContactPersonActions.loadContactPersonsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load One
  on(ContactPersonActions.loadContactPerson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ContactPersonActions.loadContactPersonSuccess,
    (state, { contactPerson }) =>
      adapter.upsertOne(contactPerson, { ...state, loading: false })
  ),
  on(ContactPersonActions.loadContactPersonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(ContactPersonActions.createContactPerson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ContactPersonActions.createContactPersonSuccess,
    (state, { contactPerson }) =>
      adapter.addOne(contactPerson, { ...state, loading: false })
  ),
  on(ContactPersonActions.createContactPersonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(ContactPersonActions.updateContactPerson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ContactPersonActions.updateContactPersonSuccess,
    (state, { contactPerson }) =>
      adapter.upsertOne(contactPerson, { ...state, loading: false })
  ),
  on(ContactPersonActions.updateContactPersonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(ContactPersonActions.deleteContactPerson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ContactPersonActions.deleteContactPersonSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ContactPersonActions.deleteContactPersonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();

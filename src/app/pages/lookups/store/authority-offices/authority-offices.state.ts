import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuthorityOffice } from './authority-offices.model';

export interface State extends EntityState<AuthorityOffice> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<AuthorityOffice> =
  createEntityAdapter<AuthorityOffice>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

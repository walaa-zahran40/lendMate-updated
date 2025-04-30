// branches.state.ts
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Branch } from './branch.model';

// 1) Define the shape of this feature’s state
export interface State extends EntityState<Branch> {
  loadedId: number | null;
  loading: boolean;
  error: string | null;
}

// 2) Create the entity adapter
export const adapter: EntityAdapter<Branch> = createEntityAdapter<Branch>({
  selectId: (branch: Branch) => branch.id, // <-- Make sure it's reading `id`
});
// 3) Define the initial state using the adapter’s getInitialState()
export const initialState: State = adapter.getInitialState({
  loadedId: null,
  loading: false,
  error: null,
});

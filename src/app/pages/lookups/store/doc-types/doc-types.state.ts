import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DocType } from './doc-type.model';

export interface State extends EntityState<DocType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<DocType> = createEntityAdapter<DocType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SubSector } from './sub-sector.model';

export interface State extends EntityState<SubSector> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<SubSector> =
  createEntityAdapter<SubSector>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

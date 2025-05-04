import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MeetingType } from './meeting-type.model';

export interface State extends EntityState<MeetingType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MeetingType> =
  createEntityAdapter<MeetingType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});

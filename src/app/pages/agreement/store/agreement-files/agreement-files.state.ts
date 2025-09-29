import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AgreementFile } from './agreement-file.model';

export interface State extends EntityState<AgreementFile> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: AgreementFile[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<AgreementFile> =
  createEntityAdapter<AgreementFile>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientFile } from './client-file.model';

export interface ClientFilesState extends EntityState<ClientFile> {
  /** Past client file records */
  history: ClientFile[];
  /** Currently selected client file */
  current?: ClientFile;
  /** Loading flag */
  loading: boolean;
  /** Error object */
  error: any;
  /** Total count of client files */
  totalCount: number;
}

export const adapter: EntityAdapter<ClientFile> =
  createEntityAdapter<ClientFile>({
    // Assuming `id` is the primary key field
    selectId: (file) => file.id!,
    // Default sort: descending by ID
    sortComparer: (a, b) => b.id! - a.id!,
  });

export const initialClientFilesState: ClientFilesState =
  adapter.getInitialState({
    history: [],
    current: undefined,
    loading: false,
    error: null,
    totalCount: 0,
  });

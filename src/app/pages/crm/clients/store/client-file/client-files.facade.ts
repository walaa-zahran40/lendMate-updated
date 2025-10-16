import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './client-files.actions';
import * as Selectors from './client-files.selectors';
import { Observable } from 'rxjs';
import { ClientFile } from './client-file.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientFilesFacade {
  /** Stream of all client files */
  files$: Observable<ClientFile[]> = this.store.select(
    Selectors.selectClientFiles
  );

  /** Total count of client files */
  total$: Observable<number> = this.store.select(
    Selectors.selectClientFilesTotal
  );

  /** Historical file records */
  history$: Observable<ClientFile[]> = this.store.select(
    Selectors.selectClientFilesHistory
  );

  /** Currently selected file */
  current$: Observable<ClientFile | undefined> = this.store.select(
    Selectors.selectCurrentClientFile
  );

  /** Loading flag */
  loading$: Observable<boolean> = this.store.select(
    Selectors.selectClientFilesLoading
  );

  /** Error object */
  error$: Observable<any> = this.store.select(Selectors.selectClientFilesError);

  /** Whether the last create/update/delete succeeded */
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadClientFiles());
  }

  loadHistory() {
    this.store.dispatch(Actions.loadClientFilesHistory());
  }

  loadOne(id: number) {
    this.store.dispatch(Actions.loadClientFile({ id }));
  }

  create(data: Partial<ClientFile>) {
    this.store.dispatch(Actions.createClientFile({ data }));
  }

  update(id: number, data: Partial<ClientFile> | any) {
    this.store.dispatch(Actions.updateClientFile({ id, data }));
  }

  /** Load files for a specific client */
  loadByClientId(clientId: number) {
    this.store.dispatch(Actions.loadClientFilesByClientId({ clientId }));
  }

  /** Delete a file by id and parent clientId */
  delete(id: number, clientId: number) {
    this.store.dispatch(Actions.deleteClientFile({ id, clientId }));
  }
}

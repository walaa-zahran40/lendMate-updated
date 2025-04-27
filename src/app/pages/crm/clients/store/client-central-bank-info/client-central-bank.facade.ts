// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as ActionsDef from './client-central-bank.actions';
// import * as Selectors from './client-central-bank.selectors';
// import { Observable } from 'rxjs';
// import {
//   ClientCentralBank,
//   ClientCentralBankHistory,
// } from './client-central-bank.model';
// import {
//   selectAllBanks,
//   selectSelectedBank,
// } from './client-central-bank.selectors';

// @Injectable({ providedIn: 'root' })
// export class ClientCentralBankFacade {
//   all$: Observable<ClientCentralBank[]> = this.store.select(selectAllBanks);

//   selectedBank$: Observable<ClientCentralBank | null> =
//     this.store.select(selectSelectedBank);

//   allBanks$: Observable<ClientCentralBank[]> =
//     this.store.select(selectAllBanks);
//   loading$: Observable<boolean> = this.store.select(Selectors.selectLoading);
//   error$: Observable<string | null> = this.store.select(Selectors.selectError);
//   history$: Observable<ClientCentralBankHistory[]> = this.store.select(
//     Selectors.selectHistory
//   );
//   historyLoading$: Observable<boolean> = this.store.select(
//     Selectors.selectHistoryLoading
//   );

//   constructor(private store: Store) {}

//   loadAll(page: number = 1) {
//     this.store.dispatch(ActionsDef.loadAll({ page }));
//   }

//   loadOne(id: number) {
//     this.store.dispatch(ActionsDef.loadOne({ id }));
//   }

//   create(payload: Partial<ClientCentralBank>) {
//     this.store.dispatch(ActionsDef.createEntity({ payload }));
//   }

//   update(id: number, changes: Partial<ClientCentralBank>) {
//     this.store.dispatch(ActionsDef.updateEntity({ id, changes }));
//   }

//   delete(id: number) {
//     this.store.dispatch(ActionsDef.deleteEntity({ id }));
//   }

//   loadHistory(clientId: number) {
//     this.store.dispatch(ActionsDef.loadHistory({ clientId }));
//   }
// }

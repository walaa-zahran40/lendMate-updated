import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as GuarantorActions from './client-guarantors.actions';
import * as GuarantorSelectors from './client-guarantors.selectors';
import { Observable } from 'rxjs';
import { ClientGuarantor } from './client-guarantors.state';

@Injectable({ providedIn: 'root' })
export class ClientGuarantorsFacade {
  list$: Observable<ClientGuarantor[]> = this.store.select(
    GuarantorSelectors.selectGuarantorList
  );
  history$: Observable<any[]> = this.store.select(
    GuarantorSelectors.selectGuarantorsHistory
  );
  loading$: Observable<boolean> = this.store.select(
    GuarantorSelectors.selectGuarantorsLoading
  );
  error$: Observable<any> = this.store.select(
    GuarantorSelectors.selectGuarantorsError
  );

  constructor(private store: Store) {}

  loadGuarantors(clientId: number) {
    this.store.dispatch(GuarantorActions.loadGuarantors({ clientId }));
  }

  createGuarantor(guarantor: ClientGuarantor) {
    this.store.dispatch(GuarantorActions.createGuarantor({ guarantor }));
  }

  updateGuarantor(id: number, guarantor: ClientGuarantor) {
    this.store.dispatch(GuarantorActions.updateGuarantor({ id, guarantor }));
  }

  deleteGuarantor(id: number) {
    this.store.dispatch(GuarantorActions.deleteGuarantor({ id }));
  }

  loadHistory() {
    this.store.dispatch(GuarantorActions.loadGuarantorsHistory());
  }
}

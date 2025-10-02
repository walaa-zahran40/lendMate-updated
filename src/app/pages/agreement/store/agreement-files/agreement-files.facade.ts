// src/app/features/leasing-agreement-files/state/leasing-agreement-files.facade.ts
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AgreementFile } from './agreement-file.model';
import { LeasingAgreementFilesActions as A } from './agreement-files.actions';
import * as Sel from './agreement-files.selectors';

@Injectable({ providedIn: 'root' })
export class LeasingAgreementFilesFacade {
  private store = inject(Store);

  loading$ = this.store.select(Sel.selectLoading);
  error$ = this.store.select(Sel.selectError);
  all$ = this.store.select(Sel.selectAllFiles);
  selected$ = this.store.select(Sel.selectSelected);

  byLeasingAgreementId$(
    leasingAgreementId: number
  ): Observable<AgreementFile[]> {
    return this.store.select(
      Sel.selectByLeasingAgreementId(leasingAgreementId)
    );
  }

  loadAll() {
    this.store.dispatch(A.loadAll());
  }

  loadHistory() {
    this.store.dispatch(A.loadHistory());
  }

  loadById(id: number) {
    this.store.dispatch(A.loadById({ id }));
  }

  loadByLeasingAgreementId(leasingAgreementId: number) {
    this.store.dispatch(A.loadByLeasingAgreementId({ leasingAgreementId }));
  }

  create(payload: any) {
    this.store.dispatch(A.create({ payload }));
  }

  update(id: number, changes: any) {
    this.store.dispatch(A.update({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(A.delete({ id }));
  }

  // Convenience: returns one-shot selected item by id
  selectOne$(id: number) {
    return this.all$.pipe(map((list) => list.find((x) => x.id === id) ?? null));
  }
}

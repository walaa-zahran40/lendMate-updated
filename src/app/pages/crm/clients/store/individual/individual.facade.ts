import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as IndividualActions from './individual.actions';
import * as IndividualSelectors from './individual.selectors';
import { Observable } from 'rxjs';
import { Individual } from '../../../../../shared/app.state';
import { IndividualState } from './individual.state';

@Injectable({
  providedIn: 'root',
})
export class IndividualFacade {
  individual$: Observable<Individual | null> = this.store.select(
    IndividualSelectors.selectIndividual
  );
  loading$: Observable<boolean> = this.store.select(
    IndividualSelectors.selectIsLoading
  );
  error$: Observable<any> = this.store.select(
    IndividualSelectors.selectIndividualError
  );

  constructor(private store: Store<IndividualState>) {}

  loadIndividual(id: number) {
    this.store.dispatch(IndividualActions.loadIndividual({ id }));
  }

  saveIndividual(individual: Partial<Individual>) {
    this.store.dispatch(IndividualActions.saveIndividual({ individual }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromContactPersons from './contact-person.reducer';
import * as ContactPersonSelectors from './contact-person.selectors';
import * as ContactPersonActions from './contact-person.actions';
import { Observable } from 'rxjs';
import { ContactPerson } from './contact-person.model';

@Injectable({ providedIn: 'root' })
export class ContactPersonFacade {
  all$: Observable<ContactPerson[]> = this.store.select(
    ContactPersonSelectors.selectAllContactPersons
  );
  loading$: Observable<boolean> = this.store.select(
    ContactPersonSelectors.selectContactPersonsLoading
  );
  total$: Observable<number> = this.store.select(
    ContactPersonSelectors.selectContactPersonsTotal
  );
  error$: Observable<any> = this.store.select(
    ContactPersonSelectors.selectContactPersonsError
  );

  constructor(private store: Store<fromContactPersons.State>) {}

  loadAll(page: number = 1) {
    this.store.dispatch(ContactPersonActions.loadContactPersons({ page }));
  }

  loadOne(id: number) {
    this.store.dispatch(ContactPersonActions.loadContactPerson({ id }));
  }

  create(data: Partial<ContactPerson>) {
    this.store.dispatch(
      ContactPersonActions.createContactPerson({ contactPerson: data })
    );
  }

  update(id: number, changes: Partial<ContactPerson>) {
    this.store.dispatch(
      ContactPersonActions.updateContactPerson({ id, changes })
    );
  }

  delete(id: number) {
    this.store.dispatch(ContactPersonActions.deleteContactPerson({ id }));
  }
}

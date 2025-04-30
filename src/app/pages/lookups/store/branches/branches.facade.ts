import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as BranchActions from './branches.actions';
import * as BranchSelectors from './branches.selectors';
import { Branch } from './branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchesFacade {
  /** Stream of all branches as an array */
  all$: Observable<Branch[]> = this.store.select(
    BranchSelectors.selectAllBranches
  );

  /** Loading indicator */
  loading$: Observable<boolean> = this.store.select(
    BranchSelectors.selectBranchesLoading
  );

  /** Error state */
  error$: Observable<any> = this.store.select(
    BranchSelectors.selectBranchesError
  );

  /** Currently selected branch (by loadedId), coerced to null if undefined */
  selectedBranch$: Observable<Branch | null> = this.store
    .select(BranchSelectors.selectCurrentBranch)
    .pipe(map((branch) => branch ?? null));

  /** Total count of branches */
  totalCount$: Observable<number> = this.store.select(
    BranchSelectors.selectBranchesCount
  );

  constructor(private store: Store) {}

  /** Load all branches */
  // branches.facade.ts
  loadAll(): void {
    console.log('🐛 [Facade] dispatching loadBranches');
    this.store.dispatch(BranchActions.loadBranches());
  }
  /** Load a single branch by ID */
  loadOne(id: number): void {
    this.store.dispatch(BranchActions.loadBranch({ id }));
  }

  /** Create a new branch */
  create(branch: Omit<Branch, 'id'>): void {
    this.store.dispatch(BranchActions.createBranch({ data: branch }));
  }

  /** Update an existing branch */
  update(id: number, changes: Partial<Branch>): void {
    this.store.dispatch(BranchActions.updateBranch({ id, data: changes }));
  }

  /** Delete a branch */
  delete(id: number): void {
    this.store.dispatch(BranchActions.deleteBranch({ id }));
  }
}

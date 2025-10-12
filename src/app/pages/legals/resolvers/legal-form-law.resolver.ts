import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LegalFormLaw } from '../store/legal-form-laws/legal-form-law.model';
import { LegalFormLawsFacade } from '../store/legal-form-laws/legal-form-laws.facade';

export const legalFormLawResolver: ResolveFn<LegalFormLaw | null> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.paramMap.get('id');
  const facade = inject(LegalFormLawsFacade);

  if (!id) return of(null); // create mode → nothing to preload

  const numericId = +id;
  facade.loadOne(numericId); // kick off load if needed

  // Wait until the facade exposes the requested item
  return facade.current$.pipe(
    filter((x): x is LegalFormLaw => !!x && x.id === numericId),
    take(1)
  );
};

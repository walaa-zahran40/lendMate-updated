import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LegalForm } from '../store/legal-forms/legal-form.model';
import { LegalFormsFacade } from '../store/legal-forms/legal-forms.facade';
export const legalFormResolver: ResolveFn<LegalForm | null> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.paramMap.get('id');
  const facade = inject(LegalFormsFacade);

  if (!id) return of(null); // create mode → nothing to preload

  const numericId = +id;
  facade.loadOne(numericId); // kick off load if needed

  // Wait until the facade exposes the requested item
  return facade.current$.pipe(
    filter((x): x is LegalForm => !!x && x.id === numericId),
    take(1)
  );
};

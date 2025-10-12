import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DocTypesFacade } from '../../lookups/store/doc-types/doc-types.facade';
import { DocType } from '../../lookups/store/doc-types/doc-type.model';
import { of } from 'rxjs';
import { filter, map, take, tap, timeout, catchError } from 'rxjs/operators';

export const docTypesResolver: ResolveFn<DocType[]> = () => {
  const facade = inject(DocTypesFacade);
  console.log('[DocTypesResolver] start → loadAll()');
  facade.loadAll();

  return facade.all$.pipe(
    tap((arr) =>
      console.log(
        '[DocTypesResolver] all$ emission len=',
        Array.isArray(arr) ? arr.length : 'n/a'
      )
    ),
    filter((arr): arr is DocType[] => Array.isArray(arr) && arr.length > 0),
    map((arr) => arr.map((t) => ({ ...t, id: Number((t as any).id) }))),
    take(1),
    timeout({ first: 8000 }),
    catchError((err) => {
      console.warn('[DocTypesResolver] timeout / error → returning []', err);
      return of([] as DocType[]);
    }),
    tap((arr) => console.log('[DocTypesResolver] resolved count:', arr.length))
  );
};

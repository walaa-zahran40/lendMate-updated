import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { filter, map, take, catchError } from 'rxjs/operators';
import { DocTypesFacade } from '../../lookups/store/doc-types/doc-types.facade';
import { DocType } from '../../lookups/store/doc-types/doc-type.model';
import { ClientFile } from '../clients/store/client-file/client-file.model';
import { ClientFilesFacade } from '../clients/store/client-file/client-files.facade';

export interface UploadDocBundle {
  clientId: number;
  documentId: number | null;
  mode: 'add' | 'edit' | 'view';
  docTypes: DocType[];
  file: ClientFile | null;
}

export const uploadDocumentResolver: ResolveFn<UploadDocBundle> = (
  route: ActivatedRouteSnapshot
) => {
  const clientId = Number(route.paramMap.get('clientId'));
  const documentId = route.paramMap.get('documentId')
    ? Number(route.paramMap.get('documentId'))
    : null;
  const qpMode =
    (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view' | null) ?? null;
  const mode: 'add' | 'edit' | 'view' = qpMode ?? (documentId ? 'edit' : 'add');

  // 1) Doc types
  const docTypesFacade = inject(DocTypesFacade);
  docTypesFacade.loadAll();
  const docTypes$ = docTypesFacade.all$.pipe(
    filter((arr): arr is DocType[] => Array.isArray(arr) && arr.length > 0),
    take(1)
  );

  // 2) File (only if editing/viewing)
  const filesFacade = inject(ClientFilesFacade);
  let file$ = of(null as ClientFile | null);
  if (documentId) {
    filesFacade.loadOne(documentId);
    // Prefer selectById(documentId) if available; fallback to current$
    const src$ = (filesFacade as any).selectById
      ? (filesFacade as any).selectById(documentId)
      : filesFacade.current$;

    file$ = src$.pipe(
      filter(
        (f: ClientFile | null | undefined): f is ClientFile =>
          !!f && f.id === documentId
      ),
      take(1),
      catchError(() => of(null))
    );
  }

  return forkJoin({ docTypes: docTypes$, file: file$ }).pipe(
    map(({ docTypes, file }) => ({
      clientId,
      documentId,
      mode,
      docTypes,
      file,
    }))
  );
};

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as DocumentTypeActions from './document-types.actions';
import { DocumentTypesService } from './document-types.service';

@Injectable()
export class DocumentTypesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.loadDocumentTypes),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            DocumentTypeActions.loadDocumentTypesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(DocumentTypeActions.loadDocumentTypesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.loadDocumentTypesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            DocumentTypeActions.loadDocumentTypesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(DocumentTypeActions.loadDocumentTypesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.loadDocumentType),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((documentType) =>
            DocumentTypeActions.loadDocumentTypeSuccess({ documentType })
          ),
          catchError((error) =>
            of(DocumentTypeActions.loadDocumentTypeFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.createDocumentType),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((documentType) =>
            DocumentTypeActions.createDocumentTypeSuccess({ documentType })
          ),
          catchError((error) =>
            of(DocumentTypeActions.createDocumentTypeFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.updateDocumentType),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((documentType) =>
            DocumentTypeActions.updateDocumentTypeSuccess({ documentType })
          ),
          catchError((error) =>
            of(DocumentTypeActions.updateDocumentTypeFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.deleteDocumentType),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => DocumentTypeActions.deleteDocumentTypeSuccess({ id })),
          catchError((error) =>
            of(DocumentTypeActions.deleteDocumentTypeFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DocumentTypeActions.createDocumentTypeSuccess,
        DocumentTypeActions.updateDocumentTypeSuccess,
        DocumentTypeActions.deleteDocumentTypeSuccess
      ),
      map(() => DocumentTypeActions.loadDocumentTypes())
    )
  );
  constructor(
    private actions$: Actions,
    private service: DocumentTypesService
  ) {}
}

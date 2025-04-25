import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentsService } from '../../services/documents.service';
import * as ClientFileActions from './client-file.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientFileEffects {
  constructor(
    private actions$: Actions,
    private documentsService: DocumentsService
  ) {}

  loadByClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.loadClientFilesByClientId),
      mergeMap(({ clientId }) =>
        this.documentsService.getClientFilesByClientId(clientId).pipe(
          map((docs) =>
            ClientFileActions.loadClientFilesByClientIdSuccess({
              documents: docs,
            })
          ),
          catchError((error) =>
            of(ClientFileActions.loadClientFilesByClientIdFailure({ error }))
          )
        )
      )
    )
  );

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.uploadClientFile),
      mergeMap(({ formData, clientId }) =>
        this.documentsService.uploadClientFile(formData).pipe(
          map((doc: any) =>
            // assume backend returns the created Document
            ClientFileActions.uploadClientFileSuccess({
              document: doc,
              clientId,
            })
          ),
          catchError((error) =>
            of(ClientFileActions.uploadClientFileFailure({ error }))
          )
        )
      )
    )
  );

  // whenever upload succeeds, reload
  reloadAfterUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.uploadClientFileSuccess),
      map(({ clientId }) =>
        ClientFileActions.loadClientFilesByClientId({ clientId })
      )
    )
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.deleteClientFile),
      mergeMap(({ id, clientId }) =>
        this.documentsService.deleteClientFile(id).pipe(
          map(() =>
            ClientFileActions.deleteClientFileSuccess({ id, clientId })
          ),
          catchError((error) =>
            of(ClientFileActions.deleteClientFileFailure({ error }))
          )
        )
      )
    )
  );

  // whenever delete succeeds, reload
  reloadAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.deleteClientFileSuccess),
      map(({ clientId }) =>
        ClientFileActions.loadClientFilesByClientId({ clientId })
      )
    )
  );
}

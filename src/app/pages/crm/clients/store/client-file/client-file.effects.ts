import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentsService } from '../../services/documents.service';
import * as ClientFileActions from './client-file.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientFileEffects {
  loadClientFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.loadClientFiles),
      mergeMap(() =>
        this.documentsService.getAllClientFiles().pipe(
          map((documents) =>
            ClientFileActions.loadClientFilesSuccess({ documents })
          ),
          catchError((error) =>
            of(ClientFileActions.loadClientFilesFailure({ error }))
          )
        )
      )
    )
  );
  loadClientFilesByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.loadClientFilesByClientId),
      mergeMap(({ clientId }) =>
        this.documentsService.getClientFilesByClientId(clientId).pipe(
          map((documents) =>
            ClientFileActions.loadClientFilesByClientIdSuccess({ documents })
          ),
          catchError((error) =>
            of(ClientFileActions.loadClientFilesByClientIdFailure({ error }))
          )
        )
      )
    )
  );

  uploadClientFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.uploadClientFile),
      mergeMap(({ formData }) =>
        this.documentsService.uploadClientFile(formData).pipe(
          map((response) =>
            ClientFileActions.uploadClientFileSuccess({ response })
          ),
          catchError((error) =>
            of(ClientFileActions.uploadClientFileFailure({ error }))
          )
        )
      )
    )
  );

  deleteClientFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.deleteClientFile),
      mergeMap(({ id }) =>
        this.documentsService.deleteClientFile(id).pipe(
          map(() => ClientFileActions.deleteClientFileSuccess({ id })),
          catchError((error) =>
            of(ClientFileActions.deleteClientFileFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private documentsService: DocumentsService
  ) {}
}

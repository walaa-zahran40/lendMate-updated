import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClientFileActions from './client-file.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { DocumentsService } from './documents.service';

@Injectable()
export class ClientFileEffects {
  constructor(
    private actions$: Actions,
    private documentsService: DocumentsService
  ) {}
  loadClientFileById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientFileActions.loadClientFileById),
      mergeMap(({ id }) =>
        this.documentsService.getClientFileById(id).pipe(
          // ✅ FIXED HERE
          map((document) =>
            ClientFileActions.loadClientFileByIdSuccess({ document })
          ),
          catchError((error) =>
            of(ClientFileActions.loadClientFileByIdFailure({ error }))
          )
        )
      )
    )
  );
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
  updateClientFile$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(ClientFileActions.updateClientFile),
        switchMap((action: { id: number; payload: any }) =>
          this.documentsService
            .updateClientFile(action.id, action.payload)
            .pipe(
              map((document: any) =>
                ClientFileActions.uploadClientFileSuccess({
                  document,
                  clientId: action.payload.clientId,
                })
              ),
              catchError((error) =>
                of(ClientFileActions.uploadClientFileFailure({ error }))
              )
            )
        )
      )
  );
}

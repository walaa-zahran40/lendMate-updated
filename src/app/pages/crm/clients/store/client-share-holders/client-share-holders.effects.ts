import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ShareholderActions from './client-share-holders.actions';
import { ClientShareholdersService } from './client-share-holders.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientShareholdersEffects {
  loadShareholders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShareholderActions.loadShareholders),
      mergeMap((action) =>
        this.service.getShareholders(action.clientId).pipe(
          map((shareholders) =>
            ShareholderActions.loadShareholdersSuccess({ shareholders })
          ),
          catchError((error) =>
            of(ShareholderActions.loadShareholdersFailure({ error }))
          )
        )
      )
    )
  );

  loadAllShareholders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShareholderActions.loadAllShareholders),
      mergeMap(() =>
        this.service.getAllShareholders().pipe(
          map((shareholders) =>
            ShareholderActions.loadAllShareholdersSuccess({ shareholders })
          ),
          catchError((error) =>
            of(ShareholderActions.loadAllShareholdersFailure({ error }))
          )
        )
      )
    )
  );

  createShareholder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShareholderActions.createShareholder),
      mergeMap((action) =>
        this.service.createShareholder(action.shareholder).pipe(
          map((shareholder) =>
            ShareholderActions.createShareholderSuccess({ shareholder })
          ),
          catchError((error) =>
            of(ShareholderActions.createShareholderFailure({ error }))
          )
        )
      )
    )
  );

  updateShareholder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShareholderActions.updateShareholder),
      mergeMap((action) =>
        this.service.updateShareholder(action.id, action.shareholder).pipe(
          map((shareholder) =>
            ShareholderActions.updateShareholderSuccess({ shareholder })
          ),
          catchError((error) =>
            of(ShareholderActions.updateShareholderFailure({ error }))
          )
        )
      )
    )
  );

  deleteShareholder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShareholderActions.deleteShareholder),
      mergeMap((action) =>
        this.service.deleteShareholder(action.id).pipe(
          map(() =>
            ShareholderActions.deleteShareholderSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(ShareholderActions.deleteShareholderFailure({ error }))
          )
        )
      )
    )
  );

  loadShareholdersHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShareholderActions.loadShareholdersHistory),
      mergeMap(() =>
        this.service.getShareholdersHistory().pipe(
          map((history) =>
            ShareholderActions.loadShareholdersHistorySuccess({ history })
          ),
          catchError((error) =>
            of(ShareholderActions.loadShareholdersHistoryFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientShareholdersService
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FollowupActions from './followups.actions';
import { FollowupsService } from './followups.service';
import { Followup } from './followup.model';

@Injectable()
export class FollowupsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.loadFollowups),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            FollowupActions.loadFollowupsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              FollowupActions.loadFollowupsFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.loadFollowupsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            FollowupActions.loadFollowupsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              FollowupActions.loadFollowupsHistoryFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.loadFollowup),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((communication) =>
            FollowupActions.loadFollowupSuccess({
              communication,
            })
          ),
          catchError((error) =>
            of(
              FollowupActions.loadFollowupFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.createFollowup),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((communication) =>
            FollowupActions.createFollowupSuccess({
              communication,
            })
          ),
          catchError((error) =>
            of(
              FollowupActions.createFollowupFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.updateFollowup),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject communicationId if missing
            const enriched: Followup = {
              ...serverReturned,
              communicationId: data.communicationId!,
            };
            console.log('[Effect:update] enriched communication →', enriched);
            return FollowupActions.updateFollowupSuccess(
              { communication: enriched }
            );
          }),
          catchError((error) =>
            of(
              FollowupActions.updateFollowupFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.deleteFollowup),
      mergeMap(({ id, communicationId }) =>
        this.service.delete(id).pipe(
          map(() =>
            FollowupActions.deleteFollowupSuccess({
              id,
              communicationId,
            })
          ),
          catchError((error) =>
            of(
              FollowupActions.deleteFollowupFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by communicationId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FollowupActions.createFollowupSuccess,
        FollowupActions.updateFollowupSuccess,
        FollowupActions.deleteFollowupSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const Id =
          'communication' in action ? action.communication.communicationId : action.communicationId;
        console.log('[RefreshList] extracted communicationId →', Id);
        return Id;
      }),

      // only continue if it’s a number
      filter(
        (communicationId): communicationId is number => typeof communicationId === 'number'
      ),

      map((communicationId) =>
        FollowupActions.loadFollowupsByCommunicationId({
          communicationId,
        })
      )
    )
  );

  /**
   * The “by‐communicationId” loader
   */
  loadByCommunicationId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupActions.loadFollowupsByCommunicationId),

      tap((action) =>
        console.log('[Effect:loadByCommunicationId] full action →', action)
      ),
      tap(({ communicationId }) =>
        console.log('[Effect:loadByCommunicationId] communicationId →', communicationId)
      ),

      mergeMap(({ communicationId }) =>
        this.service.getByCommunicationId(communicationId).pipe(
          tap((items) =>
            console.log('[Effect:loadByCommunicationId] response →', items)
          ),
          map((items) =>
            FollowupActions.loadFollowupsByCommunicationIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              FollowupActions.loadFollowupsByCommunicationIdFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: FollowupsService
  ) {}
}

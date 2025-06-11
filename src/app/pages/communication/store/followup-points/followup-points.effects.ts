import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FollowupPointActions from './followup-points.actions';
import { FollowupPointsService } from './followup-points.service';
import { FollowupPoint } from './followup-point.model';

@Injectable()
export class FollowupPointsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FollowupPointActions.loadFollowupPoints),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            FollowupPointActions.loadFollowupPointsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              FollowupPointActions.loadFollowupPointsFailure({
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
      ofType(FollowupPointActions.loadFollowupPointsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            FollowupPointActions.loadFollowupPointsHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              FollowupPointActions.loadFollowupPointsHistoryFailure(
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
      ofType(FollowupPointActions.loadFollowupPoint),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((communication) =>
            FollowupPointActions.loadFollowupPointSuccess({
              communication,
            })
          ),
          catchError((error) =>
            of(
              FollowupPointActions.loadFollowupPointFailure({
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
      ofType(FollowupPointActions.createFollowupPoint),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((communication) =>
            FollowupPointActions.createFollowupPointSuccess({
              communication,
            })
          ),
          catchError((error) =>
            of(
              FollowupPointActions.createFollowupPointFailure({
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
      ofType(FollowupPointActions.updateFollowupPoint),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject communicationId if missing
            const enriched: FollowupPoint = {
              ...serverReturned,
              followUpId: data.followUpId!,
            };
            console.log('[Effect:update] enriched communication →', enriched);
            return FollowupPointActions.updateFollowupPointSuccess(
              { communication: enriched }
            );
          }),
          catchError((error) =>
            of(
              FollowupPointActions.updateFollowupPointFailure({
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
      ofType(FollowupPointActions.deleteFollowupPoint),
      mergeMap(({ id, communicationId }) =>
        this.service.delete(id).pipe(
          map(() =>
            FollowupPointActions.deleteFollowupPointSuccess({
              id,
              communicationId,
            })
          ),
          catchError((error) =>
            of(
              FollowupPointActions.deleteFollowupPointFailure({
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
        FollowupPointActions.createFollowupPointSuccess,
        FollowupPointActions.updateFollowupPointSuccess,
        FollowupPointActions.deleteFollowupPointSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const Id =
          'communication' in action ? action.communication.followUpId : action.communicationId;
        console.log('[RefreshList] extracted communicationId →', Id);
        return Id;
      }),

      // only continue if it’s a number
      filter(
        (communicationId): communicationId is number => typeof communicationId === 'number'
      ),

      map((communicationId) =>
        FollowupPointActions.loadFollowupPointsByCommunicationId({
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
      ofType(FollowupPointActions.loadFollowupPointsByCommunicationId),

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
            FollowupPointActions.loadFollowupPointsByCommunicationIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              FollowupPointActions.loadFollowupPointsByCommunicationIdFailure(
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
    private service: FollowupPointsService
  ) {}
}

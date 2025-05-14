import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TeamOfficerActions from './team-officers.actions';
import { TeamOfficersService } from './team-officers.service';
import { TeamOfficer } from './team-officer.model';

@Injectable()
export class TeamOfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamOfficerActions.loadTeamOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            TeamOfficerActions.loadTeamOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              TeamOfficerActions.loadTeamOfficersFailure({
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
      ofType(TeamOfficerActions.loadTeamOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            TeamOfficerActions.loadTeamOfficersHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              TeamOfficerActions.loadTeamOfficersHistoryFailure(
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
      ofType(TeamOfficerActions.loadTeamOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((team) =>
            TeamOfficerActions.loadTeamOfficerSuccess({
              team,
            })
          ),
          catchError((error) =>
            of(
              TeamOfficerActions.loadTeamOfficerFailure({
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
      ofType(TeamOfficerActions.createTeamOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((team) =>
            TeamOfficerActions.createTeamOfficerSuccess({
              team,
            })
          ),
          catchError((error) =>
            of(
              TeamOfficerActions.createTeamOfficerFailure({
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
      ofType(TeamOfficerActions.updateTeamOfficer),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject teamId if missing
            const enriched: TeamOfficer = {
              ...serverReturned,
              teamId: data.teamId!,
            };
            console.log('[Effect:update] enriched team →', enriched);
            return TeamOfficerActions.updateTeamOfficerSuccess(
              { team: enriched }
            );
          }),
          catchError((error) =>
            of(
              TeamOfficerActions.updateTeamOfficerFailure({
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
      ofType(TeamOfficerActions.deleteTeamOfficer),
      mergeMap(({ id, teamId }) =>
        this.service.delete(id).pipe(
          map(() =>
            TeamOfficerActions.deleteTeamOfficerSuccess({
              id,
              teamId,
            })
          ),
          catchError((error) =>
            of(
              TeamOfficerActions.deleteTeamOfficerFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by teamId
 refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TeamOfficerActions.createTeamOfficerSuccess,
        TeamOfficerActions.updateTeamOfficerSuccess,
        TeamOfficerActions.deleteTeamOfficerSuccess
      ),
 
      map(action => {
      if ('team' in action) {
        // for create/update you returned `{ team: TeamOfficer }`,
        // so dig into that object’s teamId
        return action.team;
      } else {
        // for delete you returned `{ id, teamId }`
        return action.teamId;
      }
    }),
 
      // only continue if it’s a number
 filter((teamId):teamId is number=> typeof teamId==='number'),
      map((teamId) =>
        TeamOfficerActions.loadTeamOfficersByTeamId({
          teamId,
        })
      )
    )
  );

  /**
   * The “by‐teamId” loader
   */
  loadByTeamId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamOfficerActions.loadTeamOfficersByTeamId),

      tap((action) =>
        console.log('[Effect:loadByTeamId] full action →', action)
      ),
      tap(({ teamId }) =>
        console.log('[Effect:loadByTeamId] teamId →', teamId)
      ),

      mergeMap(({ teamId }) =>
        this.service.getByTeamId(teamId).pipe(
          tap((items) =>
            console.log('[Effect:loadByTeamId] response →', items)
          ),
          map((items) =>
            TeamOfficerActions.loadTeamOfficersByTeamIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              TeamOfficerActions.loadTeamOfficersByTeamIdFailure(
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
    private service: TeamOfficersService
  ) {}
}

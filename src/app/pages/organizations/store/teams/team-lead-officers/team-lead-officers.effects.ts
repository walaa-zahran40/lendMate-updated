import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TeamLeadOfficerActions from './team-lead-officers.actions';
import { TeamLeadOfficersService } from './team-lead-officers.service';
import { TeamLeadOfficer } from './team-lead-officer.model';

@Injectable()
export class TeamLeadOfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamLeadOfficerActions.loadTeamLeadOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            TeamLeadOfficerActions.loadTeamLeadOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.loadTeamLeadOfficersFailure({
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
      ofType(TeamLeadOfficerActions.loadTeamLeadOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            TeamLeadOfficerActions.loadTeamLeadOfficersHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.loadTeamLeadOfficersHistoryFailure(
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
      ofType(TeamLeadOfficerActions.loadTeamLeadOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((team) =>
            TeamLeadOfficerActions.loadTeamLeadOfficerSuccess({
              team,
            })
          ),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.loadTeamLeadOfficerFailure({
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
      ofType(TeamLeadOfficerActions.createTeamLeadOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((team) =>
            TeamLeadOfficerActions.createTeamLeadOfficerSuccess({
              team,
            })
          ),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.createTeamLeadOfficerFailure({
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
      ofType(TeamLeadOfficerActions.updateTeamLeadOfficer),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject teamId if missing
            const enriched: TeamLeadOfficer = {
              ...serverReturned,
              teamId: data.teamId!,
            };
            console.log('[Effect:update] enriched team →', enriched);
            return TeamLeadOfficerActions.updateTeamLeadOfficerSuccess(
              { team: enriched }
            );
          }),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.updateTeamLeadOfficerFailure({
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
      ofType(TeamLeadOfficerActions.deleteTeamLeadOfficer),
      mergeMap(({ id, teamId }) =>
        this.service.delete(id).pipe(
          map(() =>
            TeamLeadOfficerActions.deleteTeamLeadOfficerSuccess({
              id,
              teamId,
            })
          ),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.deleteTeamLeadOfficerFailure({
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
        TeamLeadOfficerActions.createTeamLeadOfficerSuccess,
        TeamLeadOfficerActions.updateTeamLeadOfficerSuccess,
        TeamLeadOfficerActions.deleteTeamLeadOfficerSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const teamId =
          'team' in action ? action.team.teamId : action.teamId;
        console.log('[RefreshList] extracted teamId →', teamId);
        return teamId;
      }),

      // only continue if it’s a number
      filter(
        (teamId): teamId is number => typeof teamId === 'number'
      ),

      map((teamId) =>
        TeamLeadOfficerActions.loadTeamLeadOfficersByTeamId({
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
      ofType(TeamLeadOfficerActions.loadTeamLeadOfficersByTeamId),

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
            TeamLeadOfficerActions.loadTeamLeadOfficersByTeamIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              TeamLeadOfficerActions.loadTeamLeadOfficersByTeamIdFailure(
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
    private service: TeamLeadOfficersService
  ) {}
}

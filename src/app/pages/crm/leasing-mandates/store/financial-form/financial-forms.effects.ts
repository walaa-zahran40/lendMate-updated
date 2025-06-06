// src/app/features/financial-forms/financial-forms.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FinancialFormsService } from './financial-forms.service';
import * as ActionsList from './financial-forms.actions';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { FinancialForm } from './financial-form.model';
import { EntityNames } from '../../../../../shared/constants/entity-names';

@Injectable()
export class FinancialFormsEffects {
  constructor(
    private actions$: Actions,
    private service: FinancialFormsService
  ) {}

  // ─── Load All ───────────────────────────────────────────────────────────────
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('[Effects] loadAll action caught')),
      switchMap(({ pageNumber }) =>
        this.service.getAll(pageNumber).pipe(
          tap((items) =>
            console.log('[Effects] Service returned items (loadAll):', items)
          ),
          map((items: FinancialForm[]) =>
            ActionsList.loadAllSuccess({ result: items })
          ),
          catchError((err) => of(ActionsList.loadAllFailure({ error: err })))
        )
      )
    )
  );

  // ─── Load By Id ──────────────────────────────────────────────────────────────
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) => console.log('[Effects] loadById caught, id=', id)),
      exhaustMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) =>
            console.log('[Effects] HTTP returned entity (loadById):', entity)
          ),
          map((entity: FinancialForm) =>
            ActionsList.loadByIdSuccess({ entity })
          ),
          catchError((err) => of(ActionsList.loadByIdFailure({ error: err })))
        )
      )
    )
  );

  // ─── Load By LeasingMandateId ─────────────────────────────────────────────────
  loadByLeasingMandateId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadByLeasingMandateId),
      tap(({ leasingMandateId }) =>
        console.log(
          '[Effects] loadByLeasingMandateId caught, leasingMandateId=',
          leasingMandateId
        )
      ),
      exhaustMap(({ leasingMandateId }) =>
        this.service.getByLeasingId(leasingMandateId).pipe(
          tap((entity) =>
            console.log(
              '[Effects] HTTP returned entity (loadByLeasingMandateId):',
              entity
            )
          ),
          map((entity: FinancialForm) =>
            ActionsList.loadByLeasingMandateIdSuccess({ entity })
          ),
          catchError((err) =>
            of(ActionsList.loadByLeasingMandateIdFailure({ error: err }))
          )
        )
      )
    )
  );

  // ─── Calculate ────────────────────────────────────────────────────────────────
  calculateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.calculateEntity),
      tap(({ payload }) =>
        console.log('[Effects] calculateEntity caught, payload=', payload)
      ),
      exhaustMap(({ payload }) =>
        this.service.calculate(payload).pipe(
          tap((entity) =>
            console.log('[Effects] HTTP returned entity (calculate):', entity)
          ),
          map((entity: FinancialForm) =>
            ActionsList.calculateEntitySuccess({ entity })
          ),
          catchError((err) =>
            of(ActionsList.calculateEntityFailure({ error: err }))
          )
        )
      )
    )
  );

  // ─── Create ──────────────────────────────────────────────────────────────────
  createEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      mergeMap(({ payload }) => {
        console.log('[Effects] createEntity caught, payload=', payload);
        return this.service.create(payload).pipe(
          mergeMap((entity: FinancialForm) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.FinancialForm,
              operation: 'create',
            }),
          ]),
          catchError((err) =>
            of(ActionsList.createEntityFailure({ error: err }))
          )
        );
      })
    )
  );

  // ─── Update ──────────────────────────────────────────────────────────────────
  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ id, changes }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.FinancialForm,
              operation: 'update',
            }),
          ]),
          catchError((err) =>
            of(ActionsList.updateEntityFailure({ error: err }))
          )
        )
      )
    )
  );

  // ─── Delete ──────────────────────────────────────────────────────────────────
  deleteEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ActionsList.deleteEntitySuccess({ id })),
          catchError((err) =>
            of(ActionsList.deleteEntityFailure({ error: err }))
          )
        )
      )
    )
  );

  // ─── (Optional) Handle calculate success to maybe update state or fire another action ─
  calculateEntitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.calculateEntitySuccess),
        tap(({ entity }) =>
          console.log(
            '[Effects] calculateEntitySuccess caught, entity:',
            entity
          )
        )
      ),
    { dispatch: false }
  );

  // ─── (Optional) Handle loadByLeasingMandateIdSuccess for logging ─────────────
  loadByLeasingMandateIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.loadByLeasingMandateIdSuccess),
        tap(({ entity }) =>
          console.log(
            '[Effects] loadByLeasingMandateIdSuccess caught, entity:',
            entity
          )
        )
      ),
    { dispatch: false }
  );
}

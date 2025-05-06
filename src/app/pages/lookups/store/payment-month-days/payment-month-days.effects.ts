import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaymentMonthDaysService } from './payment-month-days.service';
import * as ActionsList from './payment-month-days.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PaymentMonthDay } from './payment-month-day.model';

@Injectable()
export class PaymentMonthDaysEffects {
  constructor(
    private actions$: Actions,
    private service: PaymentMonthDaysService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(() => console.log('✨ Effect: loadAll action caught')),
      mergeMap(() =>
        this.service.getAll().pipe(
          tap((res) => console.log('✨ Service.getAll() returned:', res)),
          map((res) => ActionsList.loadAllSuccess({ result: res })),
          catchError((err) => {
            console.error('❌ Effect: loadAllFailure', err);
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      tap(({ id }) =>
        console.log('🔄 Effect: loadById action caught for id=', id)
      ),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          tap((entity) => console.log('🔄 Service.getById returned:', entity)),
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((err) => {
            console.error('❌ Effect: loadByIdFailure', err);
            return of(ActionsList.loadByIdFailure({ error: err }));
          })
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      tap(({ payload }) =>
        console.log('➕ Effect: createEntity action', payload)
      ),
      mergeMap(({ payload }) => {
        const dto = payload as Omit<PaymentMonthDay, 'id'>;
        return this.service.create(dto).pipe(
          tap((entity) => console.log('✅ Service.create returned:', entity)),
          map((entity) => ActionsList.createEntitySuccess({ entity })),
          catchError((err) => {
            console.error('❌ Effect: createEntityFailure', err);
            return of(ActionsList.createEntityFailure({ error: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      tap(({ id, changes }) =>
        console.log(
          '✏️ Effect: updateEntity action id=',
          id,
          ' changes=',
          changes
        )
      ),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          tap(() => console.log('✅ Service.update succeeded for id=', id)),
          map(() => ActionsList.updateEntitySuccess({ id, changes })),
          catchError((err) => {
            console.error('❌ Effect: updateEntityFailure', err);
            return of(ActionsList.updateEntityFailure({ error: err }));
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      tap(({ id }) => console.log('🗑️ Effect: deleteEntity action id=', id)),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          tap(() => console.log('✅ Service.delete succeeded for id=', id)),
          map(() => ActionsList.deleteEntitySuccess({ id })),
          catchError((err) => {
            console.error('❌ Effect: deleteEntityFailure', err);
            return of(ActionsList.deleteEntityFailure({ error: err }));
          })
        )
      )
    )
  );
}

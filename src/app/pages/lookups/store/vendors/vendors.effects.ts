import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VendorsService } from './vendors.service';
import * as ActionsList from './vendors.actions';
import { catchError, map, mergeMap, of, switchMap, tap, finalize } from 'rxjs';
import { Vendor } from './vendor.model';
import { EntityNames } from '../../../../shared/constants/entity-names';

@Injectable()
export class VendorsEffects {
  private readonly prefix = '[VendorsEffects]';

  private log(...args: any[]) {
    // toggle if you need: if (environment.production) return;
    console.log(this.prefix, ...args);
  }
  private warn(...args: any[]) {
    console.warn(this.prefix, ...args);
  }
  private error(...args: any[]) {
    console.error(this.prefix, ...args);
  }
  private previewVendor(v: any) {
    if (!v) return v;
    return {
      id: v.id,
      name: v.name,
      subSectorIdList: Array.isArray(v.subSectorIdList)
        ? `len=${v.subSectorIdList.length}`
        : v.subSectorIdList,
      hasSubSectorsObj: Array.isArray(v.subSectors),
    };
  }

  normalizeVendor = (dto: any): Vendor => {
    const rawIds = Array.isArray(dto.subSectorIdList)
      ? dto.subSectorIdList
      : Array.isArray(dto.subSectorList)
      ? dto.subSectorList
      : Array.isArray(dto.subSectors)
      ? dto.subSectors
      : [];

    const ids = this.keepNumbers(rawIds); // 🚫 no more NaN

    return {
      id: Number(dto.id),
      name: dto.name,
      nameAR: dto.nameAR,
      taxNumber: dto.taxNumber,
      isActive: !!dto.isActive,
      subSectorIdList: ids,
    };
  };

  constructor(private actions$: Actions, private svc: VendorsService) {}

  // LOAD ALL
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      tap(({ pageNumber }) => {
        console.groupCollapsed(`${this.prefix} loadAll`);
        this.log('action payload:', { pageNumber });
      }),
      mergeMap(() => {
        const started = performance.now();
        return this.svc.getAll().pipe(
          tap((raw) =>
            this.log('HTTP raw (wrapper items count):', raw?.length)
          ),
          map((items) => items.map(this.normalizeVendor)),
          tap((items) =>
            this.log(
              'normalized count:',
              items.length,
              'sample[0]:',
              this.previewVendor(items[0])
            )
          ),
          finalize(() => {
            this.log(
              'loadAll latency(ms):',
              Math.round(performance.now() - started)
            );
            console.groupEnd();
          }),
          map((items) => ActionsList.loadAllSuccess({ result: items })),
          catchError((err) => {
            this.error('loadAll error:', err);
            console.groupEnd();
            return of(ActionsList.loadAllFailure({ error: err }));
          })
        );
      })
    )
  );
  private keepNumbers = (xs: unknown[]) =>
    (xs ?? [])
      .filter(
        (x): x is number | string | { id: number | string } =>
          x !== null && x !== undefined
      )
      .map((x) => (typeof x === 'object' ? (x as any).id : x))
      .map((x) => (typeof x === 'string' ? Number(x) : x))
      .filter((x): x is number => Number.isFinite(x as number));

  // LOAD BY ID
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      switchMap(({ id }) =>
        this.svc.getById(id).pipe(
          tap((raw) => console.log('[VendorsEffects] getById raw:', raw)),
          map((raw) => {
            const vendor = this.normalizeVendor(raw);
            console.log('[VendorsEffects] normalized vendor:', vendor);
            return ActionsList.loadByIdSuccess({ entity: vendor });
          }),
          catchError((error) => of(ActionsList.loadByIdFailure({ error })))
        )
      )
    )
  );

  loadByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionsList.loadByIdSuccess),
        tap(({ entity }) =>
          this.log(
            'dispatch → loadByIdSuccess (preview):',
            this.previewVendor(entity)
          )
        )
      ),
    { dispatch: false }
  );

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      tap(({ payload }) => {
        console.groupCollapsed(`${this.prefix} create`);
        this.log('action payload (preview):', this.previewVendor(payload));
      }),
      mergeMap(({ payload }) => {
        const started = performance.now();
        const dto = payload as Omit<Vendor, 'id'>;
        return this.svc.create(dto).pipe(
          tap((entity) =>
            this.log('HTTP created entity:', this.previewVendor(entity))
          ),
          finalize(() => {
            this.log(
              'create latency(ms):',
              Math.round(performance.now() - started)
            );
            console.groupEnd();
          }),
          mergeMap((entity) => [
            ActionsList.createEntitySuccess({ entity }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Vendor,
              operation: 'create',
            }),
          ]),
          catchError((error) => {
            this.error('create error:', error);
            console.groupEnd();
            return of(ActionsList.createEntityFailure({ error }));
          })
        );
      })
    )
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      tap(({ id, changes }) => {
        console.groupCollapsed(`${this.prefix} update`);
        this.log('action payload:', {
          id,
          changesPreview: this.previewVendor(changes),
        });
      }),
      mergeMap(({ id, changes }) => {
        const started = performance.now();
        return this.svc.update(id, changes).pipe(
          finalize(() => {
            this.log(
              'update latency(ms):',
              Math.round(performance.now() - started)
            );
            console.groupEnd();
          }),
          mergeMap(() => [
            ActionsList.updateEntitySuccess({ id, changes }),
            ActionsList.entityOperationSuccess({
              entity: EntityNames.Vendor,
              operation: 'update',
            }),
          ]),
          catchError((error) => {
            this.error('update error:', error);
            console.groupEnd();
            return of(ActionsList.updateEntityFailure({ error }));
          })
        );
      })
    )
  );

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      tap(({ id }) => {
        console.groupCollapsed(`${this.prefix} delete`);
        this.log('action payload:', { id });
      }),
      mergeMap(({ id }) => {
        const started = performance.now();
        return this.svc.delete(id).pipe(
          finalize(() => {
            this.log(
              'delete latency(ms):',
              Math.round(performance.now() - started)
            );
            console.groupEnd();
          }),
          map(() => ActionsList.deleteEntitySuccess({ id })),
          catchError((error) => {
            this.error('delete error:', error);
            console.groupEnd();
            return of(ActionsList.deleteEntityFailure({ error }));
          })
        );
      })
    )
  );

  // REFRESH LIST ON MUTATIONS
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ActionsList.createEntitySuccess,
        ActionsList.updateEntitySuccess,
        ActionsList.deleteEntitySuccess
      ),
      tap((action) =>
        this.log('mutation success → refresh list, action:', action.type)
      ),
      map(() => ActionsList.loadAll({}))
    )
  );

  // HISTORY
  loadVendorHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadVendorHistory),
      tap(() => {
        console.groupCollapsed(`${this.prefix} loadVendorHistory`);
        this.log('action caught');
      }),
      switchMap(() => {
        const started = performance.now();
        return this.svc.getAllHistory().pipe(
          tap((history) =>
            this.log(
              'history items:',
              history?.length,
              'sample[0]:',
              this.previewVendor(history?.[0])
            )
          ),
          finalize(() => {
            this.log(
              'loadVendorHistory latency(ms):',
              Math.round(performance.now() - started)
            );
            console.groupEnd();
          }),
          map((history) => ActionsList.loadVendorHistorySuccess({ history })),
          catchError((error) => {
            this.error('history error:', error);
            console.groupEnd();
            return of(ActionsList.loadVendorHistoryFailure({ error }));
          })
        );
      })
    )
  );
}

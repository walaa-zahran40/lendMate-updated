import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PeriodUnit } from './period-unit.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GracePeriodUnitsService {
  private baseUrl = `${environment.apiUrl}PeriodUnits`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PeriodUnit[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PeriodUnit[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPeriodUnits`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching GracePeriodUnits:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PeriodUnit> {
    return this.http.get<PeriodUnit>(`${this.baseUrl}/PeriodUnitId?id=${id}`);
  }

  create(payload: Omit<PeriodUnit, 'id'>): Observable<PeriodUnit> {
    return this.http.post<PeriodUnit>(
      `${this.baseUrl}/CreatePeriodUnit`,
      payload
    );
  }

  update(id: number, changes: Partial<PeriodUnit>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<PeriodUnit[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PeriodUnit[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPeriodUnitsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PeriodUnits:', err);
          return throwError(() => err);
        })
      );
  }
}

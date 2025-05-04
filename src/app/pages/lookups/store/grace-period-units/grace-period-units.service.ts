import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { GracePeriodUnit } from './grace-period-unit.model';

@Injectable({ providedIn: 'root' })
export class GracePeriodUnitsService {
  private baseUrl = 'https://192.168.10.67:7070/api/PeriodUnits';

  constructor(private http: HttpClient) {}

  getAll(): Observable<GracePeriodUnit[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: GracePeriodUnit[]; totalCount: number }>(
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

  getById(id: number): Observable<GracePeriodUnit> {
    return this.http.get<GracePeriodUnit>(
      `${this.baseUrl}/PeriodUnitId?id=${id}`
    );
  }

  create(payload: Omit<GracePeriodUnit, 'id'>): Observable<GracePeriodUnit> {
    return this.http.post<GracePeriodUnit>(
      `${this.baseUrl}/CreatePeriodUnit`,
      payload
    );
  }

  update(id: number, changes: Partial<GracePeriodUnit>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

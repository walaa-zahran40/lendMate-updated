import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateValidityUnit } from './mandate-validity-unit.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandateValidityUnitsService {
  private baseUrl = `${environment.apiUrl}ValidityUnits`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MandateValidityUnit[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateValidityUnit[]; totalCount: number }>(
        `${this.baseUrl}/GetAllValidityUnits`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching MandateValidityUnits:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<MandateValidityUnit> {
    return this.http.get<MandateValidityUnit>(
      `${this.baseUrl}/ValidityUnitId?id=${id}`
    );
  }

  create(
    payload: Omit<MandateValidityUnit, 'id'>
  ): Observable<MandateValidityUnit> {
    return this.http.post<MandateValidityUnit>(
      `${this.baseUrl}/CreateValidityUnit`,
      payload
    );
  }

  update(id: number, changes: Partial<MandateValidityUnit>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<MandateValidityUnit[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateValidityUnit[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandateValidityUnitsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching MandateValidityUnits:', err);
          return throwError(() => err);
        })
      );
  }
}

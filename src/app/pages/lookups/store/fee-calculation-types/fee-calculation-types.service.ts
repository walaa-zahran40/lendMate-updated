import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { FeeCalculationType } from './fee-calculation-types.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeeCalculationTypesService {
  private baseUrl = `${environment.apiUrl}FeeCalculationTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FeeCalculationType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: FeeCalculationType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFeeCalculationTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching FeeCalculationTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<FeeCalculationType> {
    return this.http.get<FeeCalculationType>(
      `${this.baseUrl}/FeeCalculationTypeId?id=${id}`
    );
  }

  create(
    payload: Omit<FeeCalculationType, 'id'>
  ): Observable<FeeCalculationType> {
    return this.http.post<FeeCalculationType>(
      `${this.baseUrl}/CreateFeeCalculationType`,
      payload
    );
  }

  update(id: number, changes: Partial<FeeCalculationType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

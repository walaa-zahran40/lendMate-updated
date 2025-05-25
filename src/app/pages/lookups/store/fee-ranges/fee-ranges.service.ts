import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { FeeRange } from './fee-ranges.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeeRangesService {
  private baseUrl = `${environment.apiUrl}FeesRanges`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FeeRange[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: FeeRange[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFeesRanges`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching FeeRanges:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<FeeRange> {
    return this.http.get<FeeRange>(`${this.baseUrl}/FeesRangeId?id=${id}`);
  }

  create(payload: Omit<FeeRange, 'id'>): Observable<FeeRange> {
    return this.http.post<FeeRange>(
      `${this.baseUrl}/CreateFeesRange`,
      payload
    );
  }

  update(id: number, changes: Partial<FeeRange>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

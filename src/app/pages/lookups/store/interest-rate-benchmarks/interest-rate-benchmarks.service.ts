import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { InterestRateBenchMark } from './interest-rate-benchmark.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InterestRateBenchMarksService {
  private baseUrl = `${environment.apiUrl}InterestRateBenchMarks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<InterestRateBenchMark[]> {
    return this.http
      .get<{ items: InterestRateBenchMark[]; totalCount: number }>(
        `${this.baseUrl}/GetAllInterestRateBenchMarks`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching InterestRateBenchMarks:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<InterestRateBenchMark> {
    return this.http.get<InterestRateBenchMark>(
      `${this.baseUrl}/InterestRateBenchmarkId?id=${id}`
    );
  }

  create(
    payload: Omit<InterestRateBenchMark, 'id'>
  ): Observable<InterestRateBenchMark> {
    return this.http.post<InterestRateBenchMark>(
      `${this.baseUrl}/CreateInterestRateBenchMark`,
      payload
    );
  }

  update(
    id: number,
    changes: Partial<InterestRateBenchMark>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<InterestRateBenchMark[]> {
    return this.http
      .get<{ items: InterestRateBenchMark[]; totalCount: number }>(
        `${this.baseUrl}/GetAllInterestRateBenchMarksHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching InterestRateBenchMarks:', err);
          return throwError(() => err);
        })
      );
  }
}

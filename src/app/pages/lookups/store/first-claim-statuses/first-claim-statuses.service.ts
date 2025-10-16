import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { FirstClaimStatus } from './first-claim-status.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirstClaimStatusesService {
  private baseUrl = `${environment.apiUrl}FirstClaimStatuses`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FirstClaimStatus[]> {
    return this.http
      .get<{ items: FirstClaimStatus[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFirstClaimStatuses`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching FirstClaimStatuses:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<FirstClaimStatus[]> {
    return this.http
      .get<{ items: FirstClaimStatus[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFirstClaimStatusesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching FirstClaimStatuses:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<FirstClaimStatus> {
    return this.http.get<FirstClaimStatus>(
      `${this.baseUrl}/FirstClaimStatusId?id=${id}`
    );
  }

  create(payload: Omit<FirstClaimStatus, 'id'>): Observable<FirstClaimStatus> {
    return this.http.post<FirstClaimStatus>(
      `${this.baseUrl}/CreateFirstClaimStatus`,
      payload
    );
  }

  update(id: number, changes: Partial<FirstClaimStatus>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

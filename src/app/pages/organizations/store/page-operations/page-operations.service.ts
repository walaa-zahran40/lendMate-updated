import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PageOperation } from './page-operation.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PageOperationsService {
  private baseUrl = `${environment.apiUrl}PageOperations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PageOperation[]> {
    return this.http
      .get<{ items: PageOperation[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPageOperations`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PageOperations:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PageOperation> {
    return this.http.get<PageOperation>(
      `${this.baseUrl}/PageOperationId?PageOperationId=${id}`
    );
  }

  create(payload: Omit<PageOperation, 'id'>): Observable<PageOperation> {
    return this.http.post<PageOperation>(
      `${this.baseUrl}/CreatePageOperation`,
      payload
    );
  }

  update(id: number, changes: Partial<PageOperation>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

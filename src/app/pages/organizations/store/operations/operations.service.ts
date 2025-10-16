import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Operation } from './operation.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OperationsService {
  private baseUrl = `${environment.apiUrl}Operations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Operation[]> {
    return this.http
      .get<{ items: Operation[]; totalCount: number }>(
        `${this.baseUrl}/GetAllOperations`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Operations:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Operation> {
    return this.http.get<Operation>(
      `${this.baseUrl}/OperationId?OperationId=${id}`
    );
  }

  create(payload: Omit<Operation, 'id'>): Observable<Operation> {
    return this.http.post<Operation>(
      `${this.baseUrl}/CreateOperation`,
      payload
    );
  }

  update(id: number, changes: Partial<Operation>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

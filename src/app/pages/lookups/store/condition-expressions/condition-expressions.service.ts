import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ConditionExpression } from './condition-expressions.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConditionExpressionsService {
  private baseUrl = `${environment.apiUrl}ConditionExpressions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ConditionExpression[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: ConditionExpression[]; totalCount: number }>(
        `${this.baseUrl}/GetAllConditionExpressions`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching ConditionExpressions:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ConditionExpression> {
    return this.http.get<ConditionExpression>(`${this.baseUrl}/ConditionExpressionId?id=${id}`);
  }

  create(payload: Omit<ConditionExpression, 'id'>): Observable<ConditionExpression> {
    return this.http.post<ConditionExpression>(
      `${this.baseUrl}/CreateConditionExpression`,
      payload
    );
  }

  update(id: number, changes: Partial<ConditionExpression>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

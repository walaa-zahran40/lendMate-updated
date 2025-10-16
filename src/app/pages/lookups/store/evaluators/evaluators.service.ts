import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Evaluator } from './evaluator.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EvaluatorsService {
  private baseUrl = `${environment.apiUrl}Evaluators`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Evaluator[]> {
    return this.http
      .get<{ items: Evaluator[]; totalCount: number }>(
        `${this.baseUrl}/GetAllEvaluators`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching Evaluators:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Evaluator> {
    return this.http.get<Evaluator>(`${this.baseUrl}/EvaluatorId?id=${id}`);
  }

  create(payload: Omit<Evaluator, 'id'>): Observable<Evaluator> {
    return this.http.post<Evaluator>(
      `${this.baseUrl}/CreateEvaluator`,
      payload
    );
  }

  update(id: number, changes: Partial<Evaluator>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Evaluator[]> {
    return this.http
      .get<{ items: Evaluator[]; totalCount: number }>(
        `${this.baseUrl}/GetAllEvaluatorsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching Evaluators:', err);
          return throwError(() => err);
        })
      );
  }
}

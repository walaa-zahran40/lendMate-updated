import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Condition } from './condition.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConditionsService {
  private baseUrl = `${environment.apiUrl}Conditions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Condition[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Condition[]; totalCount: number }>(
        `${this.baseUrl}/GetAllConditions`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Conditions:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Condition> {
    return this.http.get<Condition>(`${this.baseUrl}/ConditionId?id=${id}`);
  }

  create(payload: Omit<Condition, 'id'>): Observable<Condition> {
    return this.http.post<Condition>(
      `${this.baseUrl}/CreateCondition`,
      payload
    );
  }

  update(id: number, changes: Partial<Condition>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Condition[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Condition[]; totalCount: number }>(
        `${this.baseUrl}/GetAllConditionsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Conditions:', err);
          return throwError(() => err);
        })
      );
  }
}

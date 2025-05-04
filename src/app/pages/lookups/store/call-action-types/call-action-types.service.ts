import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CallActionType } from './call-action-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CallActionTypesService {
  private baseUrl = `${environment.apiUrl}CallActionTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CallActionType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: CallActionType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCallActionTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching CallActionTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<CallActionType> {
    return this.http.get<CallActionType>(
      `${this.baseUrl}/CallActionTypeId?id=${id}`
    );
  }

  create(payload: Omit<CallActionType, 'id'>): Observable<CallActionType> {
    return this.http.post<CallActionType>(
      `${this.baseUrl}/CreateCallActionType`,
      payload
    );
  }

  update(id: number, changes: Partial<CallActionType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

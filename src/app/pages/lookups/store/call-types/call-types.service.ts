import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CallType } from './call-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CallTypesService {
  private baseUrl = `${environment.apiUrl}CallTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CallType[]> {
    return this.http
      .get<{ items: CallType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCallTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching CallTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<CallType> {
    return this.http.get<CallType>(`${this.baseUrl}/CallTypeId?id=${id}`);
  }

  create(payload: Omit<CallType, 'id'>): Observable<CallType> {
    return this.http.post<CallType>(`${this.baseUrl}/CreateCallType`, payload);
  }

  update(id: number, changes: Partial<CallType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<CallType[]> {
    return this.http
      .get<{ items: CallType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCallTypesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching CallTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

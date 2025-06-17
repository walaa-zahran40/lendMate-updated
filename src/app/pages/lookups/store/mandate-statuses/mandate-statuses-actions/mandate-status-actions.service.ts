import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateStatusAction } from './mandate-status-action.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandateStatusActionsService {
  private baseUrl = `${environment.apiUrl}MandateStatusActions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MandateStatusAction[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateStatusAction[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandateStatusActions`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching MandateStatusActions:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<MandateStatusAction> {
    return this.http.get<MandateStatusAction>(
      `${this.baseUrl}/MandateStatusActionId?mandateStatusActionId=${id}`
    );
  }

  create(
    payload: Omit<MandateStatusAction, 'id'>
  ): Observable<MandateStatusAction> {
    return this.http.post<MandateStatusAction>(
      `${this.baseUrl}/CreateMandateStatusAction`,
      payload
    );
  }

  update(id: number, changes: Partial<MandateStatusAction>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<MandateStatusAction[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateStatusAction[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandateStatusActionsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching MandateStatusActions:', err);
          return throwError(() => err);
        })
      );
  }
}

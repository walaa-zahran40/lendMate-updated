import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ClientStatusAction } from './client-statuses-action.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientStatusActionsService {
  private baseUrl = `${environment.apiUrl}ClientStatusActions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientStatusAction[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: ClientStatusAction[]; totalCount: number }>(`${this.baseUrl}/GetAllClientStatusActions`)
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching ClientStatusActions:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ClientStatusAction> {
    return this.http.get<ClientStatusAction>(`${this.baseUrl}/ClientStatusActionId?clientStatusActionId=${id}`);
  }

  create(payload: Omit<ClientStatusAction, 'id'>): Observable<ClientStatusAction> {
    return this.http.post<ClientStatusAction>(`${this.baseUrl}/CreateClientStatusAction`, payload);
  }

  update(id: number, changes: Partial<ClientStatusAction>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

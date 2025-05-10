import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ClientType } from './client-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientTypesService {
  private baseUrl = `${environment.apiUrl}ClientTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientType[]> {
    console.log('🚀 Service: clienting GET …');
    return this.http
      .get<{ items: ClientType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClientTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching ClientTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ClientType> {
    return this.http.get<ClientType>(
      `${this.baseUrl}/ClientTypeId?clientTypeId=${id}`
    );
  }

  create(payload: Omit<ClientType, 'id'>): Observable<ClientType> {
    return this.http.post<ClientType>(
      `${this.baseUrl}/CreateClientType`,
      payload
    );
  }

  update(id: number, changes: Partial<ClientType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

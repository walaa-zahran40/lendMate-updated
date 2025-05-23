import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ClientOfficerType } from './client-officer-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientOfficerTypesService {
  private baseUrl = `${environment.apiUrl}ClientOfficerTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientOfficerType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: ClientOfficerType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClientOfficerTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching ClientOfficerTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ClientOfficerType> {
    return this.http.get<ClientOfficerType>(
      `${this.baseUrl}/ClientOfficerTypeId?clientOfficerTypeId=${id}`
    );
  }

  create(payload: Omit<ClientOfficerType, 'id'>): Observable<ClientOfficerType> {
    return this.http.post<ClientOfficerType>(
      `${this.baseUrl}/CreateClientOfficerType`,
      payload
    );
  }

  update(id: number, changes: Partial<ClientOfficerType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

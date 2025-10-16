import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ClientIdentityType } from './client-identity-type.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientIdentityTypesService {
  private baseUrl = `${environment.apiUrl}ClientIdentityTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientIdentityType[]> {
    return this.http
      .get<{ items: ClientIdentityType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClientIdentityTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching ClientIdentityTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ClientIdentityType> {
    return this.http.get<ClientIdentityType>(
      `${this.baseUrl}/ClientIdentityTypeId?id=${id}`
    );
  }

  create(
    payload: Omit<ClientIdentityType, 'id'>
  ): Observable<ClientIdentityType> {
    return this.http.post<ClientIdentityType>(
      `${this.baseUrl}/CreateClientIdentityType`,
      payload
    );
  }

  update(id: number, changes: Partial<ClientIdentityType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

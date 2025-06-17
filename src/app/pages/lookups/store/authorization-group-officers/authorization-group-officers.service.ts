import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthorizationGroupOfficer } from './authorization-group-officer.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthorizationGroupOfficersService {
  private baseUrl = `${environment.apiUrl}AuthorizationGroupOfficers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuthorizationGroupOfficer[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: AuthorizationGroupOfficer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAuthorizationGroupOfficers`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching AuthorizationGroupOfficers:',
            err
          );
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<AuthorizationGroupOfficer> {
    return this.http.get<AuthorizationGroupOfficer>(
      `${this.baseUrl}/AuthorizationGroupOfficerId?id=${id}`
    );
  }

  create(
    payload: Omit<AuthorizationGroupOfficer, 'id'>
  ): Observable<AuthorizationGroupOfficer> {
    return this.http.post<AuthorizationGroupOfficer>(
      `${this.baseUrl}/CreateAuthorizationGroupOfficer`,
      payload
    );
  }

  update(
    id: number,
    changes: Partial<AuthorizationGroupOfficer>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<AuthorizationGroupOfficer[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: AuthorizationGroupOfficer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAuthorizationGroupOfficersHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching AuthorizationGroupOfficers:',
            err
          );
          return throwError(() => err);
        })
      );
  }
}

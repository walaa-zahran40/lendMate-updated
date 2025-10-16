import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthorizationGroup } from './authorization-group.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthorizationGroupsService {
  private baseUrl = `${environment.apiUrl}AuthorizationGroups`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuthorizationGroup[]> {
    return this.http
      .get<{ items: AuthorizationGroup[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAuthorizationGroups`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching AuthorizationGroups:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<AuthorizationGroup> {
    return this.http.get<AuthorizationGroup>(
      `${this.baseUrl}/AuthorizationGroupId?id=${id}`
    );
  }

  create(
    payload: Omit<AuthorizationGroup, 'id'>
  ): Observable<AuthorizationGroup> {
    return this.http.post<AuthorizationGroup>(
      `${this.baseUrl}/CreateAuthorizationGroup`,
      payload
    );
  }

  update(id: number, changes: Partial<AuthorizationGroup>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<AuthorizationGroup[]> {
    return this.http
      .get<{ items: AuthorizationGroup[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAuthorizationGroupsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching AuthorizationGroups:', err);
          return throwError(() => err);
        })
      );
  }
}

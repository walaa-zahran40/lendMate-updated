import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Role } from './role.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private baseUrl = `${environment.apiUrl}ApplicationRoles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http
      .get<{ items: Role[]; totalCount: number }>(
        `${this.baseUrl}/GetAllApplicationRoles`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Roles:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(
      `${this.baseUrl}/ApplicationRoleId?applicationRoleId=${id}`
    );
  }

  create(payload: Omit<Role, 'id'>): Observable<Role> {
    return this.http.post<Role>(
      `${this.baseUrl}/CreateApplicationRole`,
      payload
    );
  }

  update(id: number, changes: Partial<Role>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Branch } from './branch.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BranchesService {
  private baseUrl = `${environment.apiUrl}Branches`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Branch[]> {
    return this.http
      .get<{ items: Branch[]; totalCount: number }>(
        `${this.baseUrl}/GetAllBranches`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Branches:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/BranchId?id=${id}`);
  }

  create(payload: Omit<Branch, 'id'>): Observable<Branch> {
    return this.http.post<Branch>(`${this.baseUrl}/CreateBranch`, payload);
  }

  update(id: number, changes: Partial<Branch>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Page } from './page.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PagesService {
  private baseUrl = `${environment.apiUrl}Pages`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Page[]> {
    return this.http
      .get<{ items: Page[]; totalCount: number }>(`${this.baseUrl}/GetAllPages`)
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Pages:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Page> {
    return this.http.get<Page>(`${this.baseUrl}/PageId?PageId=${id}`);
  }

  create(payload: Omit<Page, 'id'>): Observable<Page> {
    return this.http.post<Page>(`${this.baseUrl}/CreatePage`, payload);
  }

  update(id: number, changes: Partial<Page>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

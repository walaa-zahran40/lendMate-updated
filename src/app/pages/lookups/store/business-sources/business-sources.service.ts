import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { BusinessSource } from './business-source.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusinessSourcesService {
  private baseUrl = `${environment.apiUrl}BusinessSources`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BusinessSource[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: BusinessSource[]; totalCount: number }>(
        `${this.baseUrl}/GetAllBusinessSources`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching BusinessSources:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<BusinessSource[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: BusinessSource[]; totalCount: number }>(
        `${this.baseUrl}/GetAllBusinessSourcesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching BusinessSources:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<BusinessSource> {
    return this.http.get<BusinessSource>(
      `${this.baseUrl}/BusinessSourceId?id=${id}`
    );
  }

  create(payload: Omit<BusinessSource, 'id'>): Observable<BusinessSource> {
    return this.http.post<BusinessSource>(
      `${this.baseUrl}/CreateBusinessSource`,
      payload
    );
  }

  update(id: number, changes: Partial<BusinessSource>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

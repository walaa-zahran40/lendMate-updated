import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { InsuredBy } from './insured-by.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InsuredByService {
  private baseUrl = `${environment.apiUrl}InsuredBy`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<InsuredBy[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: InsuredBy[]; totalCount: number }>(
        `${this.baseUrl}/GetAllInsuredBy`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching InsuredBy:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<InsuredBy> {
    return this.http.get<InsuredBy>(`${this.baseUrl}/InsuredById?id=${id}`);
  }

  create(payload: Omit<InsuredBy, 'id'>): Observable<InsuredBy> {
    return this.http.post<InsuredBy>(
      `${this.baseUrl}/CreateInsuredBy`,
      payload
    );
  }

  update(id: number, changes: Partial<InsuredBy>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<InsuredBy[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: InsuredBy[]; totalCount: number }>(
        `${this.baseUrl}/GetAllInsuredBysHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching InsuredBys:', err);
          return throwError(() => err);
        })
      );
  }
}

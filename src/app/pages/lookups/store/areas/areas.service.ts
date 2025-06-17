import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Area } from './area.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AreasService {
  private baseUrl = `${environment.apiUrl}Areas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Area[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Area[]; totalCount: number }>(`${this.baseUrl}/GetAllAreas`)
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Areas:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.baseUrl}/AreaId?id=${id}`);
  }

  create(payload: Omit<Area, 'id'>): Observable<Area> {
    return this.http.post<Area>(`${this.baseUrl}/CreateArea`, payload);
  }

  update(id: number, changes: Partial<Area>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Area[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Area[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAreasHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Areas:', err);
          return throwError(() => err);
        })
      );
  }
}

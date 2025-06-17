import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { FollowupType } from './folllowup-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FollowupTypesService {
  private baseUrl = `${environment.apiUrl}FollowupTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FollowupType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: FollowupType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFollowupTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching FollowupTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<FollowupType> {
    return this.http.get<FollowupType>(
      `${this.baseUrl}/FollowupTypeId?id=${id}`
    );
  }

  create(payload: Omit<FollowupType, 'id'>): Observable<FollowupType> {
    return this.http.post<FollowupType>(
      `${this.baseUrl}/CreateFollowupType`,
      payload
    );
  }

  update(id: number, changes: Partial<FollowupType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<FollowupType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: FollowupType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFollowUpTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching FollowUpTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

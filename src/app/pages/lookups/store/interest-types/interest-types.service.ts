import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { InterestType } from './interest-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InterestTypesService {
  private baseUrl = `${environment.apiUrl}InterestTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<InterestType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: InterestType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllInterestTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching InterestTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<InterestType> {
    return this.http.get<InterestType>(
      `${this.baseUrl}/InterestTypeId?id=${id}`
    );
  }

  create(payload: Omit<InterestType, 'id'>): Observable<InterestType> {
    return this.http.post<InterestType>(
      `${this.baseUrl}/CreateInterestType`,
      payload
    );
  }

  update(id: number, changes: Partial<InterestType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<InterestType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: InterestType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllInterestTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching InterestTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

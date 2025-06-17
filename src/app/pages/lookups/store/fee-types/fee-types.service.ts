import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { FeeType } from './fee-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeeTypesService {
  private baseUrl = `${environment.apiUrl}FeeTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FeeType[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: FeeType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFeeTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching FeeTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<FeeType> {
    return this.http.get<FeeType>(`${this.baseUrl}/FeeTypeId?id=${id}`);
  }

  create(payload: Omit<FeeType, 'id'>): Observable<FeeType> {
    return this.http.post<FeeType>(`${this.baseUrl}/CreateFeeType`, payload);
  }

  update(id: number, changes: Partial<FeeType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<FeeType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: FeeType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllFeeTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching FeeTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

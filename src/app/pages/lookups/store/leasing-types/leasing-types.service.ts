import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LeasingType } from './leasing-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeasingTypesService {
  private baseUrl = `${environment.apiUrl}LeasingTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LeasingType[]> {
    return this.http
      .get<{ items: LeasingType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLeasingTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching LeasingTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<LeasingType> {
    return this.http.get<LeasingType>(`${this.baseUrl}/LeasingTypeId?id=${id}`);
  }

  create(payload: Omit<LeasingType, 'id'>): Observable<LeasingType> {
    return this.http.post<LeasingType>(
      `${this.baseUrl}/CreateLeasingType`,
      payload
    );
  }

  update(id: number, changes: Partial<LeasingType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<LeasingType[]> {
    return this.http
      .get<{ items: LeasingType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLeasingTypesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching LeasingTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { TmlOfficerType } from './tml-officer-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TmlOfficerTypesService {
  private baseUrl = `${environment.apiUrl}TmlOfficerTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TmlOfficerType[]> {
    return this.http
      .get<{ items: TmlOfficerType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllTmlOfficerTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching TmlOfficerTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<TmlOfficerType> {
    return this.http.get<TmlOfficerType>(
      `${this.baseUrl}/TmlOfficerTypeId?id=${id}`
    );
  }

  create(payload: Omit<TmlOfficerType, 'id'>): Observable<TmlOfficerType> {
    return this.http.post<TmlOfficerType>(
      `${this.baseUrl}/CreateTmlOfficerType`,
      payload
    );
  }

  update(id: number, changes: Partial<TmlOfficerType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<TmlOfficerType[]> {
    return this.http
      .get<{ items: TmlOfficerType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllTmlOfficerTypesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching TmlOfficerTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

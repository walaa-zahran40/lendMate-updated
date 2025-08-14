import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LicenseType } from './license-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LicenseTypesService {
  private baseUrl = `${environment.apiUrl}LicenseTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LicenseType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: LicenseType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLicenseTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching LicenseTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<LicenseType> {
    return this.http.get<LicenseType>(`${this.baseUrl}/LicenseTypeId?id=${id}`);
  }

  create(payload: Omit<LicenseType, 'id'>): Observable<LicenseType> {
    return this.http.post<LicenseType>(
      `${this.baseUrl}/CreateLicenseType`,
      payload
    );
  }

  update(id: number, changes: Partial<LicenseType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<LicenseType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: LicenseType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLicenseTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching LicenseTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

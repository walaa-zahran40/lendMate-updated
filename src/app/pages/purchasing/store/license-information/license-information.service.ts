import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LicenseInformation } from './license-information.model';

@Injectable({ providedIn: 'root' })
export class LicenseInformationService {
  private baseUrl = `${environment.apiUrl}VehicleLicenses`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LicenseInformation[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: LicenseInformation[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVehicleLicenses`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching LicenseInformation:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<LicenseInformation[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: LicenseInformation[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLicenseInformationHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching LicenseInformation:', err);
          return throwError(() => err);
        })
      );
  }
  // licenseInformation.service.ts
  getById(id: number): Observable<LicenseInformation> {
    const url = `${this.baseUrl}/LicenseInformationId?id=${id}`; // <- check endpoint name
    console.log('[LicenseInformationService] GET', url);
    return this.http.get<any>(url).pipe(
      tap((raw) =>
        console.log('[LicenseInformationService] raw response:', raw)
      ),
      // 🔧 If your API wraps the entity, unwrap it here:
      map((raw) => {
        // common patterns – adjust to your backend
        if (raw?.item) return raw.item; // { item: LicenseInformation }
        if (raw?.data) return raw.data; // { data: LicenseInformation }
        if (Array.isArray(raw)) return raw[0]; // [LicenseInformation]
        return raw as LicenseInformation; // plain LicenseInformation
      }),
      tap((entity) =>
        console.log(
          '[LicenseInformationService] mapped LicenseInformation:',
          entity
        )
      ),
      catchError((err) => {
        console.error('[LicenseInformationService] GET FAIL', err);
        return throwError(() => err);
      })
    );
  }

  create(
    payload: Omit<LicenseInformation, 'id'>
  ): Observable<LicenseInformation> {
    return this.http.post<LicenseInformation>(
      `${this.baseUrl}/CreateLicenseInformation`,
      payload
    );
  }

  update(id: number, changes: Partial<LicenseInformation>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

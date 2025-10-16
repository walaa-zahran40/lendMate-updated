import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LicenseProvider } from './license-provider.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LicenseProvidersService {
  private baseUrl = `${environment.apiUrl}LicenseProviders`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LicenseProvider[]> {
    return this.http
      .get<{ items: LicenseProvider[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLicenseProviders`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching LicenseProviders:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<LicenseProvider> {
    return this.http.get<LicenseProvider>(
      `${this.baseUrl}/LicenseProviderId?id=${id}`
    );
  }

  create(payload: Omit<LicenseProvider, 'id'>): Observable<LicenseProvider> {
    return this.http.post<LicenseProvider>(
      `${this.baseUrl}/CreateLicenseProvider`,
      payload
    );
  }

  update(id: number, changes: Partial<LicenseProvider>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<LicenseProvider[]> {
    return this.http
      .get<{ items: LicenseProvider[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLicenseProvidersHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching LicenseProviders:', err);
          return throwError(() => err);
        })
      );
  }
}

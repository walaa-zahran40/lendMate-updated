import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Vendor } from './vendor.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VendorsService {
  private baseUrl = `${environment.apiUrl}Vendors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vendor[]> {
    return this.http
      .get<{ items: Vendor[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVendors`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Vendors:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/VendorId?vendorId=${id}`);
  }

  create(payload: Omit<Vendor, 'id'>): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.baseUrl}/CreateVendor`, payload);
  }

  update(id: number, changes: Partial<Vendor>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Vendor[]> {
    return this.http
      .get<{ items: Vendor[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVendorsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Vendors:', err);
          return throwError(() => err);
        })
      );
  }
}

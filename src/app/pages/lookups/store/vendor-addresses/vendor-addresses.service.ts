import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { VendorAddress } from './vendor-address.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VendorAddressesService {
  private baseUrl = `${environment.apiUrl}VendorAddresses`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VendorAddress[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: VendorAddress[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVendorAddresses`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching VendorAddresses:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<VendorAddress> {
    return this.http.get<VendorAddress>(`${this.baseUrl}/id?id=${id}`);
  }

  create(payload: Omit<VendorAddress, 'id'>): Observable<VendorAddress> {
    return this.http.post<VendorAddress>(
      `${this.baseUrl}/CreateVendorAddress`,
      payload
    );
  }

  update(id: number, changes: Partial<VendorAddress>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<VendorAddress[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: VendorAddress[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVendorAddressesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching VendorAddresses:', err);
          return throwError(() => err);
        })
      );
  }
}

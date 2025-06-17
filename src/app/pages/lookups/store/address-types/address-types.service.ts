import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AddressType } from './address-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AddressTypesService {
  private baseUrl = `${environment.apiUrl}AddressTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AddressType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: AddressType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAddressTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching AddressTypes:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<AddressType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: AddressType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAddressTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching AddressTypes:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<AddressType> {
    return this.http.get<AddressType>(`${this.baseUrl}/AddressTypeId?id=${id}`);
  }

  create(payload: Omit<AddressType, 'id'>): Observable<AddressType> {
    return this.http.post<AddressType>(
      `${this.baseUrl}/CreateAddressType`,
      payload
    );
  }

  update(id: number, changes: Partial<AddressType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

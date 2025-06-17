import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { TaxOffice } from './tax_office.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaxOfficesService {
  private baseUrl = `${environment.apiUrl}TaxOffices`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaxOffice[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: TaxOffice[]; totalCount: number }>(
        `${this.baseUrl}/GetAllTaxOffices`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching TaxOffices:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<TaxOffice> {
    return this.http.get<TaxOffice>(
      `${this.baseUrl}/TaxOfficeId?taxOfficeId=${id}`
    );
  }

  create(payload: Omit<TaxOffice, 'id'>): Observable<TaxOffice> {
    return this.http.post<TaxOffice>(
      `${this.baseUrl}/CreateTaxOffice`,
      payload
    );
  }

  update(id: number, changes: Partial<TaxOffice>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<TaxOffice[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: TaxOffice[]; totalCount: number }>(
        `${this.baseUrl}/GetAllTaxOfficesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching TaxOffices:', err);
          return throwError(() => err);
        })
      );
  }
}

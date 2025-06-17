import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PaymentType } from './payment-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentTypesService {
  private baseUrl = `${environment.apiUrl}PaymentTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PaymentType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PaymentType> {
    return this.http.get<PaymentType>(`${this.baseUrl}/PaymentTypeId?id=${id}`);
  }

  create(payload: Omit<PaymentType, 'id'>): Observable<PaymentType> {
    return this.http.post<PaymentType>(
      `${this.baseUrl}/CreatePaymentType`,
      payload
    );
  }

  update(id: number, changes: Partial<PaymentType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<PaymentType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PaymentType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

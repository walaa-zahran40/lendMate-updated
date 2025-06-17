import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PaymentMethod } from './payment-method.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentMethodsService {
  private baseUrl = `${environment.apiUrl}PaymentMethods`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentMethod[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PaymentMethod[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentMethods`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentMethods:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(
      `${this.baseUrl}/PaymentMethodId?id=${id}`
    );
  }

  create(payload: Omit<PaymentMethod, 'id'>): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(
      `${this.baseUrl}/CreatePaymentMethod`,
      payload
    );
  }

  update(id: number, changes: Partial<PaymentMethod>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<PaymentMethod[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PaymentMethod[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentMethodsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentMethods:', err);
          return throwError(() => err);
        })
      );
  }
}

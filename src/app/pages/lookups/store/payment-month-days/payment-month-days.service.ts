import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PaymentMonthDay } from './payment-month-day.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentMonthDaysService {
  private baseUrl = `${environment.apiUrl}PaymentMonthDays`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentMonthDay[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PaymentMonthDay[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentMonthDays`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentMonthDays:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PaymentMonthDay> {
    return this.http.get<PaymentMonthDay>(
      `${this.baseUrl}/PaymentMonthDayId?id=${id}`
    );
  }

  create(payload: Omit<PaymentMonthDay, 'id'>): Observable<PaymentMonthDay> {
    return this.http.post<PaymentMonthDay>(
      `${this.baseUrl}/CreatePaymentMonthDay`,
      payload
    );
  }

  update(id: number, changes: Partial<PaymentMonthDay>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<PaymentMonthDay[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PaymentMonthDay[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentMonthDaysHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentMonthDays:', err);
          return throwError(() => err);
        })
      );
  }
}

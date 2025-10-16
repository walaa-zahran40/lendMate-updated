import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PaymentPeriod } from './payment-period.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentPeriodsService {
  private baseUrl = `${environment.apiUrl}PaymentPeriods`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentPeriod[]> {
    return this.http
      .get<{ items: PaymentPeriod[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentPeriods`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentPeriods:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PaymentPeriod> {
    return this.http.get<PaymentPeriod>(
      `${this.baseUrl}/PaymentPeriodId?id=${id}`
    );
  }

  create(payload: Omit<PaymentPeriod, 'id'>): Observable<PaymentPeriod> {
    return this.http.post<PaymentPeriod>(
      `${this.baseUrl}/CreatePaymentPeriod`,
      payload
    );
  }

  update(id: number, changes: Partial<PaymentPeriod>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<PaymentPeriod[]> {
    return this.http
      .get<{ items: PaymentPeriod[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentPeriodsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentPeriods:', err);
          return throwError(() => err);
        })
      );
  }
}

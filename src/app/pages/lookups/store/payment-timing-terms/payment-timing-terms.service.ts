import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PaymentTimingTerm } from './payment-timing-term.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentTimingTermsService {
  private baseUrl = `${environment.apiUrl}PaymentTimingTerms`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentTimingTerm[]> {
    return this.http
      .get<{ items: PaymentTimingTerm[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentTimingTerms`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentTimingTerms:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PaymentTimingTerm> {
    return this.http.get<PaymentTimingTerm>(
      `${this.baseUrl}/PaymentTimingTermId?id=${id}`
    );
  }

  create(
    payload: Omit<PaymentTimingTerm, 'id'>
  ): Observable<PaymentTimingTerm> {
    return this.http.post<PaymentTimingTerm>(
      `${this.baseUrl}/CreatePaymentTimingTerm`,
      payload
    );
  }

  update(id: number, changes: Partial<PaymentTimingTerm>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<PaymentTimingTerm[]> {
    return this.http
      .get<{ items: PaymentTimingTerm[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPaymentTimingTermsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PaymentTimingTerms:', err);
          return throwError(() => err);
        })
      );
  }
}

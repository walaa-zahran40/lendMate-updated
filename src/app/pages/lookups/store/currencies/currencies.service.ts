import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Currency } from './currency.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  private baseUrl = `${environment.apiUrl}Currencies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Currency[]> {
    return this.http
      .get<{ items: Currency[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCurrencies`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Currencies:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.baseUrl}/CurrencyId?id=${id}`);
  }

  create(payload: Omit<Currency, 'id'>): Observable<Currency> {
    return this.http.post<Currency>(`${this.baseUrl}/CreateCurrency`, payload);
  }

  update(id: number, changes: Partial<Currency>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Currency[]> {
    return this.http
      .get<{ items: Currency[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCurrenciesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Currencies:', err);
          return throwError(() => err);
        })
      );
  }
}

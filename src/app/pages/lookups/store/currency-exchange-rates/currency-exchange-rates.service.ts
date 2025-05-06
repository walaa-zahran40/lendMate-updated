import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyExchangeRate } from './currency-exchange-rate.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class CurrencyExchangeRatesService {
  private api = `${environment.apiUrl}CurrencyExchangeRates`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<CurrencyExchangeRate>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<CurrencyExchangeRate>>(
      `${this.api}/GetAllCurrencyExchangeRates`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<CurrencyExchangeRate>> {
    return this.http.get<PagedResponse<CurrencyExchangeRate>>(
      `${this.api}/GetAllCurrencyExchangeRatesHistory`
    );
  }

  getById(id: number): Observable<CurrencyExchangeRate> {
    return this.http.get<CurrencyExchangeRate>(`${this.api}/CurrencyExchangeRateId?id=${id}`);
  }

  create(data: Partial<CurrencyExchangeRate>): Observable<CurrencyExchangeRate> {
    return this.http.post<CurrencyExchangeRate>(`${this.api}/CreateCurrencyExchangeRate`, data);
  }

  update(id: number, data: Partial<CurrencyExchangeRate>): Observable<CurrencyExchangeRate> {
    return this.http.put<CurrencyExchangeRate>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

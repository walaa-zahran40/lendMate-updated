import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from './currency.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  private api = `${environment.apiUrl}Currencies`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Currency>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<Currency>>(
      `${this.api}/GetAllCurrencies`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Currency>> {
    return this.http.get<PagedResponse<Currency>>(
      `${this.api}/GetAllCurrenciesHistory`
    );
  }

  getById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.api}/CurrencyId?id=${id}`);
  }

  create(data: Partial<Currency>): Observable<Currency> {
    return this.http.post<Currency>(`${this.api}/CreateCurrency`, data);
  }

  update(id: number, data: Partial<Currency>): Observable<Currency> {
    return this.http.put<Currency>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

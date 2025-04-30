import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from './currency.model';


interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/Currencies';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Currency>> {
    let params = new HttpParams();
    if (pageNumber != null)
      params = params.set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse<Currency>>(
      `${this.apiUrl}/GetAllCurrencies`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Currency>> {
    return this.http.get<PagedResponse<Currency>>(
      `${this.apiUrl}/GetAllCurrenciesHistory`
    );
  }

  getById(id: number): Observable<Currency> {
    return this.http.get<Currency>(`${this.apiUrl}/Currency?id=${id}`);
  }

  create(data: Partial<Currency>): Observable<Currency> {
    return this.http.post<Currency>(
      `${this.apiUrl}/CreateCompanyType`,
      data
    );
  }

  update(id: number, data: Partial<Currency>): Observable<Currency> {
    return this.http.put<Currency>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

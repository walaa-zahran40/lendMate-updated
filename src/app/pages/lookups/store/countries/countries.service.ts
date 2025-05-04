import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/Countries';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Country>> {
    let params = new HttpParams();
    if (pageNumber != null)
      params = params.set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse<Country>>(
      `${this.apiUrl}/GetAllCountries`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Country>> {
    return this.http.get<PagedResponse<Country>>(
      `${this.apiUrl}/GetAllCountriesHistory`
    );
  }

  getById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/CountryId?countryid=${id}`);
  }

  create(data: Partial<Country>): Observable<Country> {
    return this.http.post<Country>(
      `${this.apiUrl}/CreateCountry`,
      data
    );
  }

  update(id: number, data: Partial<Country>): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

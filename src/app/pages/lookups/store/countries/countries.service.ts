import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Country } from './country.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private baseUrl = `${environment.apiUrl}Countries`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: Country[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCountries`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Countries:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/CountryId?countryId=${id}`);
  }

  create(payload: Omit<Country, 'id'>): Observable<Country> {
    return this.http.post<Country>(`${this.baseUrl}/CreateCountry`, payload);
  }

  update(id: number, changes: Partial<Country>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Country[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Country[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCountriesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Countries:', err);
          return throwError(() => err);
        })
      );
  }
}

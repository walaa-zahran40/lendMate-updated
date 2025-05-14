import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LeasingMandate } from './leasing-mandate.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeasingMandatesService {
  private baseUrl = `${environment.apiUrl}LeasingMandates`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LeasingMandate[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: LeasingMandate[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLeasingMandates`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items),
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching LeasingMandates:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<LeasingMandate> {
    return this.http.get<LeasingMandate>(`${this.baseUrl}/LeasingMandateId?id=${id}`);
  }

  create(payload: Omit<LeasingMandate, 'id'>): Observable<LeasingMandate> {
    return this.http.post<LeasingMandate>(`${this.baseUrl}/CreateLeasingMandate`, payload);
  }

  update(id: number, changes: Partial<LeasingMandate>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

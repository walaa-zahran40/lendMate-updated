import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { BusinessLine } from './business-line.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusinessLinesService {
  private baseUrl = `${environment.apiUrl}BusinessLines`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BusinessLine[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: BusinessLine[]; totalCount: number }>(
        `${this.baseUrl}/GetAllBusinessLines`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching BusinessLines:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<BusinessLine> {
    return this.http.get<BusinessLine>(
      `${this.baseUrl}/BusinessLineId?id=${id}`
    );
  }

  create(payload: Omit<BusinessLine, 'id'>): Observable<BusinessLine> {
    return this.http.post<BusinessLine>(
      `${this.baseUrl}/CreateBusinessLine`,
      payload
    );
  }

  update(id: number, changes: Partial<BusinessLine>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

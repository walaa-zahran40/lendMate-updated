import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SMEClientCode } from './sme-client-codes.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SMEClientCodesService {
  private baseUrl = `${environment.apiUrl}SMEClientCodes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SMEClientCode[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: SMEClientCode[]; totalCount: number }>(
        `${this.baseUrl}/GetAllSMEClientCodes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching SMEClientCodes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<SMEClientCode> {
    return this.http.get<SMEClientCode>(
      `${this.baseUrl}/SMEClientCodeId?sMEClientCodeId=${id}`
    );
  }

  create(payload: Omit<SMEClientCode, 'id'>): Observable<SMEClientCode> {
    return this.http.post<SMEClientCode>(
      `${this.baseUrl}/CreateSMEClientCode`,
      payload
    );
  }

  update(id: number, changes: Partial<SMEClientCode>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IdentificationType } from './identification-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IdentificationTypesService {
  private baseUrl = `${environment.apiUrl}IdentificationTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IdentificationType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: IdentificationType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllIdentificationTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching IdentificationTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<IdentificationType> {
    return this.http.get<IdentificationType>(
      `${this.baseUrl}/IdentificationTypeId?identificationTypeId=${id}`
    );
  }

  create(
    payload: Omit<IdentificationType, 'id'>
  ): Observable<IdentificationType> {
    return this.http.post<IdentificationType>(
      `${this.baseUrl}/CreateIdentificationType`,
      payload
    );
  }

  update(id: number, changes: Partial<IdentificationType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<IdentificationType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: IdentificationType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllIdentificationTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching IdentificationTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

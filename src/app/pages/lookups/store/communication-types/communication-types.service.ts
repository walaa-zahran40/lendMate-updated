import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CommunicationType } from './communication-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommunicationTypesService {
  private baseUrl = `${environment.apiUrl}CommunicationTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CommunicationType[]> {
    console.log('🚀 Service: client GET …');
    return this.http
      .get<{ items: CommunicationType[]; totalCount: number }>(
        `${this.baseUrl}/GetCommunicationTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching CommunicationTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<CommunicationType> {
    return this.http.get<CommunicationType>(
      `${this.baseUrl}/CommunicationTypeId?id=${id}`
    );
  }

  create(
    payload: Omit<CommunicationType, 'id'>
  ): Observable<CommunicationType> {
    return this.http.post<CommunicationType>(
      `${this.baseUrl}/CreateCommunicationFlowType`,
      payload
    );
  }

  update(id: number, changes: Partial<CommunicationType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

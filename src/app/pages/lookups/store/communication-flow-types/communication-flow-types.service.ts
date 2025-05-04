import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CommunicationFlowType } from './communication-flow-type.model';

@Injectable({ providedIn: 'root' })
export class CommunicationFlowTypesService {
  private baseUrl = 'https://192.168.10.67:7070/api/CommunicationFlowTypes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CommunicationFlowType[]> {
    console.log('🚀 Service: client GET …');
    return this.http
      .get<{ items: CommunicationFlowType[]; totalCount: number }>(
        `${this.baseUrl}/GetCommunicationFlawTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching CommunicationFlowTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<CommunicationFlowType> {
    return this.http.get<CommunicationFlowType>(
      `${this.baseUrl}/CommunicationFlawTypeId?id=${id}`
    );
  }

  create(
    payload: Omit<CommunicationFlowType, 'id'>
  ): Observable<CommunicationFlowType> {
    return this.http.post<CommunicationFlowType>(
      `${this.baseUrl}/CreateCommunicationFlawType`,
      payload
    );
  }

  update(
    id: number,
    changes: Partial<CommunicationFlowType>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

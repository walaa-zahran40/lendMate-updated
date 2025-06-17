import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CommunicationFlowType } from './communication-flow-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommunicationFlowTypesService {
  private baseUrl = `${environment.apiUrl}CommunicationFlowTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CommunicationFlowType[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: CommunicationFlowType[]; totalCount: number }>(
        `${this.baseUrl}/GetCommunicationFlowTypes`
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
      `${this.baseUrl}/CommunicationFlowTypeId?id=${id}`
    );
  }

  create(
    payload: Omit<CommunicationFlowType, 'id'>
  ): Observable<CommunicationFlowType> {
    return this.http.post<CommunicationFlowType>(
      `${this.baseUrl}/CreateCommunicationFlowType`,
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
  //History management
  getAllHistory(): Observable<CommunicationFlowType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: CommunicationFlowType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCommunicationFlowTypesHistory`
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
}

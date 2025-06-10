import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Mandate, MandateWorkFlowAction } from './leasing-mandate.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandatesService {
  private baseUrl = `${environment.apiUrl}LeasingMandates`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mandate[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Mandate[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLeasingMandates`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Mandates:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Mandate> {
    return this.http.get<Mandate>(
      `${this.baseUrl}/LeasingMandateId?leasingMandate=${id}`
    );
  }

  create(payload: Omit<Mandate, 'id'>): Observable<Mandate> {
    return this.http.post<Mandate>(
      `${this.baseUrl}/CreateLeasingMandate`,
      payload
    );
  }

  update(id: number, changes: Partial<Mandate>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  performWorkflowAction(id: number, changes: Partial<MandateWorkFlowAction>): Observable<void> {
      return this.http.post<void>(`${environment.apiUrl}MandateWorkFlowActions/CreateMandateWorkFlowAction`, changes);
  }
}

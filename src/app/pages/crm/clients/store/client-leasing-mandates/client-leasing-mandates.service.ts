import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import {
  MandateDetail,
  MandateWorkflowAction,
} from './client-leasing-mandate.model';

@Injectable({ providedIn: 'root' })
export class MandatesService {
  private baseUrl = `${environment.apiUrl}LeasingMandates`;

  constructor(private http: HttpClient) {}

  getByClientId(id: number): Observable<MandateDetail> {
    return this.http.get<MandateDetail>(`${this.baseUrl}/GetByClientId/${id}`);
  }
  getByLeasingId(id: number): Observable<MandateDetail> {
    return this.http.get<MandateDetail>(
      `${this.baseUrl}/LeasingMandateId?leasingMandate=${id}`
    );
  }
  // After — allow partial payloads:
  create(dto: Partial<Omit<MandateDetail, 'id'>>): Observable<MandateDetail> {
    return this.http.post<MandateDetail>(
      `${this.baseUrl}/CreateLeasingMandate`,
      dto
    );
  }

  update(id: number, changes: Partial<MandateDetail>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  performWorkflowAction(
    id: number,
    changes: Partial<MandateWorkflowAction>
  ): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}MandateWorkFlowActions/CreateMandateWorkFlowAction`,
      changes
    );
  }
}

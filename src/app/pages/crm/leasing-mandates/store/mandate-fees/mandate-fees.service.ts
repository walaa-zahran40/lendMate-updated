import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateFee } from './mandate-fee.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandateFeesService {
  private baseUrl = `${environment.apiUrl}MandateFees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MandateFee[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateFee[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandateFees`
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
  getById(id: number): Observable<MandateFee> {
    return this.http.get<MandateFee>(
      `${this.baseUrl}/MandateFeeId?leasingMandate=${id}`
    );
  }

  create(payload: Omit<MandateFee, 'id'>): Observable<MandateFee> {
    return this.http.post<MandateFee>(
      `${this.baseUrl}/CreateMandateFee`,
      payload
    );
  }

  update(id: number, changes: Partial<MandateFee>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

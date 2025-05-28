import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandatePaymentSetting } from './mandate-payment-setting.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandatePaymentSettingsService {
  private baseUrl = `${environment.apiUrl}MandatePaymentSettings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MandatePaymentSetting[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandatePaymentSetting[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandatePaymentSettings`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching MandatePaymentSettings:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<MandatePaymentSetting> {
    return this.http.get<MandatePaymentSetting>(`${this.baseUrl}/MandatePaymentSettingId?id=${id}`);
  }

  create(payload: Omit<MandatePaymentSetting, 'id'>): Observable<MandatePaymentSetting> {
    return this.http.post<MandatePaymentSetting>(
      `${this.baseUrl}/CreateMandatePaymentSetting`,
      payload
    );
  }

  update(id: number, changes: Partial<MandatePaymentSetting>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

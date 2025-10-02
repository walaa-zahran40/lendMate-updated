import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AgreementRegistration,
  LeasingAgreementRegistrationHistory,
} from './agreement-registration.model';

@Injectable({ providedIn: 'root' })
export class LeasingAgreementRegistrationsService {
  private readonly baseUrl =
    'https://lendmate.corplease.com.eg:7070/api/LeasingAgreementRegistrations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AgreementRegistration[]> {
    return this.http.get<AgreementRegistration[]>(
      `${this.baseUrl}/GetAllLeasingAgreementRegistrations`
    );
  }

  getAllHistory(): Observable<LeasingAgreementRegistrationHistory[]> {
    return this.http.get<LeasingAgreementRegistrationHistory[]>(
      `${this.baseUrl}/GetAllLeasingAgreementRegistrationsHistory`
    );
  }

  getById(id: number): Observable<AgreementRegistration> {
    const params = new HttpParams().set('id', id);
    return this.http.get<AgreementRegistration>(
      `${this.baseUrl}/LeasingAgreementRegistrationId`,
      { params }
    );
  }

  getByLeasingAgreementId(
    leasingAgreementId: number
  ): Observable<AgreementRegistration[]> {
    const params = new HttpParams().set(
      'leasingAgreementId',
      leasingAgreementId
    );
    return this.http.get<AgreementRegistration[]>(
      `${this.baseUrl}/LeasingAgreementId`,
      { params }
    );
  }

  create(
    payload: Omit<AgreementRegistration, 'id'>
  ): Observable<AgreementRegistration> {
    return this.http.post<AgreementRegistration>(
      `${this.baseUrl}/CreateLeasingAgreementRegistration`,
      payload
    );
  }

  update(
    id: number,
    payload: Partial<AgreementRegistration>
  ): Observable<AgreementRegistration> {
    return this.http.put<AgreementRegistration>(
      `${this.baseUrl}/${id}`,
      payload
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

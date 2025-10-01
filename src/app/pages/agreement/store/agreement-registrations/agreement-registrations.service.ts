import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgreementRegistration } from './agreement-registration.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class AgreementRegistrationsService {
  private api = `${environment.apiUrl}ClientsAddresses`;

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<AgreementRegistration>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<AgreementRegistration>>(
      `${this.api}/GetAllAgreementRegistrations`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<AgreementRegistration>> {
    return this.http.get<PagedResponse<AgreementRegistration>>(
      `${this.api}/GetAllAgreementRegistrationsHistory`
    );
  }

  getById(id: number): Observable<AgreementRegistration> {
    return this.http.get<AgreementRegistration>(`${this.api}/Id?id=${id}`);
  }

  create(
    data: Partial<AgreementRegistration>
  ): Observable<AgreementRegistration> {
    return this.http.post<AgreementRegistration>(
      `${this.api}/CreateAgreementRegistration`,
      data
    );
  }

  update(
    id: number,
    data: Partial<AgreementRegistration>
  ): Observable<AgreementRegistration> {
    return this.http.put<AgreementRegistration>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<AgreementRegistration[]> {
    return this.http.get<AgreementRegistration[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

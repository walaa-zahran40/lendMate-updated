import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgreementOfficer } from './agreement-officer.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class AgreementOfficersService {
  private api = `${environment.apiUrl}AgreementOfficers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<AgreementOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<AgreementOfficer>>(
      `${this.api}/GetAllAgreementOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<AgreementOfficer>> {
    return this.http.get<PagedResponse<AgreementOfficer>>(
      `${this.api}/GetAllAgreementOfficersHistory`
    );
  }

  getById(agreementId: number): Observable<AgreementOfficer> {
    return this.http.get<AgreementOfficer>(
      `${this.api}/AgreementOfficerId?id=${agreementId}`
    );
  }

  getByAgreementId(agreementId: number): Observable<AgreementOfficer[]> {
    return this.http.get<AgreementOfficer[]>(
      `${this.api}/AgreementId?agreementId=${agreementId}`
    );
  }

  create(data: Partial<AgreementOfficer>): Observable<AgreementOfficer> {
    return this.http.post<AgreementOfficer>(
      `${this.api}/CreateAgreementOfficer`,
      data
    );
  }

  update(
    id: number,
    data: Partial<AgreementOfficer>
  ): Observable<AgreementOfficer> {
    return this.http.put<AgreementOfficer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<AgreementOfficer[]> {
    return this.http.get<AgreementOfficer[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgreementContactPerson } from './agreement-contact-person.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class AgreementContactPersonsService {
  private api = `${environment.apiUrl}AgreementContactPersons`;

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<AgreementContactPerson>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<AgreementContactPerson>>(
      `${this.api}/GetAllAgreementContactPersons`
    );
  }

  getHistory(): Observable<PagedResponse<AgreementContactPerson>> {
    return this.http.get<PagedResponse<AgreementContactPerson>>(
      `${this.api}/GetAllAgreementContactPersonsHistory`
    );
  }

  getById(
    agreementId: number
  ): Observable<{ items: AgreementContactPerson[]; totalCount: number }> {
    return this.http.get<{
      items: AgreementContactPerson[];
      totalCount: number;
    }>(`${this.api}/AgreementId?agreementId=${agreementId}`);
  }

  create(
    data: Partial<AgreementContactPerson>
  ): Observable<AgreementContactPerson> {
    return this.http.post<AgreementContactPerson>(
      `${this.api}/CreateAgreementContactPerson`,
      data
    );
  }

  update(
    id: number,
    data: Partial<AgreementContactPerson>
  ): Observable<AgreementContactPerson> {
    return this.http.put<AgreementContactPerson>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<AgreementContactPerson[]> {
    return this.http.get<AgreementContactPerson[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateAgreementContactPersonDto,
  AgreementContactPerson,
  PagedResponse,
  UpdateAgreementContactPersonDto,
} from './agreement-contact-person.model';

// If you already have environments, swap this for environment.apiBaseUrl
const API_BASE =
  'https://lendmate.corplease.com.eg:7070/api/AgreementContactPersons';

@Injectable({ providedIn: 'root' })
export class AgreementContactPersonsService {
  private http = inject(HttpClient);

  // GET /GetAllAgreementContactPersons?pageNumber
  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<AgreementContactPerson>> {
    let params = new HttpParams();
    if (pageNumber != null) params = params.set('pageNumber', pageNumber);
    return this.http.get<PagedResponse<AgreementContactPerson>>(
      `${API_BASE}/GetAllAgreementContactPersons`,
      { params }
    );
  }

  // GET /AgreementContactPersonId?leasingAgreement={id}
  // NOTE: The API name is confusing; this endpoint returns a single item by its own id.
  getByAgreementContactPersonId(
    id: number
  ): Observable<AgreementContactPerson> {
    const params = new HttpParams().set('leasingAgreement', id); // matches your swagger
    return this.http.get<AgreementContactPerson>(
      `${API_BASE}/AgreementContactPersonId`,
      {
        params,
      }
    );
  }

  // GET /AgreementId?agreementId={agreementId}
  getByAgreementId(agreementId: number): Observable<AgreementContactPerson[]> {
    const params = new HttpParams().set('id', agreementId);
    return this.http.get<AgreementContactPerson[]>(
      `${API_BASE}/AgreementContactPersonId`,
      {
        params,
      }
    );
  }

  // POST /CreateAgreementContactPerson
  create(
    dto: CreateAgreementContactPersonDto
  ): Observable<AgreementContactPerson> {
    return this.http.post<AgreementContactPerson>(
      `${API_BASE}/CreateAgreementContactPerson`,
      dto
    );
  }

  // PUT /{id}
  update(
    dto: UpdateAgreementContactPersonDto
  ): Observable<AgreementContactPerson> {
    return this.http.put<AgreementContactPerson>(`${API_BASE}/${dto.id}`, dto);
  }

  // DELETE /{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/${id}`);
  }
}

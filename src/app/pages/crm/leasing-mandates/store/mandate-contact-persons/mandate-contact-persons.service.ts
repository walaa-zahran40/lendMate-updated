import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateMandateContactPersonDto,
  MandateContactPerson,
  PagedResponse,
  UpdateMandateContactPersonDto,
} from './mandate-contact-person.model';

// If you already have environments, swap this for environment.apiBaseUrl
const API_BASE =
  'https://lendmate.corplease.com.eg:7070/api/MandateContactPersons';

@Injectable({ providedIn: 'root' })
export class MandateContactPersonsService {
  private http = inject(HttpClient);

  // GET /GetAllMandateContactPersons?pageNumber
  getAll(pageNumber?: number): Observable<PagedResponse<MandateContactPerson>> {
    let params = new HttpParams();
    if (pageNumber != null) params = params.set('pageNumber', pageNumber);
    return this.http.get<PagedResponse<MandateContactPerson>>(
      `${API_BASE}/GetAllMandateContactPersons`,
      { params }
    );
  }

  // GET /MandateContactPersonId?leasingMandate={id}
  // NOTE: The API name is confusing; this endpoint returns a single item by its own id.
  getByMandateContactPersonId(id: number): Observable<MandateContactPerson> {
    const params = new HttpParams().set('id', id); // matches your swagger
    return this.http.get<MandateContactPerson>(
      `${API_BASE}/MandateContactPersonId`,
      {
        params,
      }
    );
  }

  // GET /MandateId?mandateId={mandateId}
  getByMandateId(mandateId: number): Observable<MandateContactPerson[]> {
    const params = new HttpParams().set('mandateId', mandateId);
    return this.http.get<MandateContactPerson[]>(`${API_BASE}/MandateId`, {
      params,
    });
  }

  // POST /CreateMandateContactPerson
  create(dto: CreateMandateContactPersonDto): Observable<MandateContactPerson> {
    return this.http.post<MandateContactPerson>(
      `${API_BASE}/CreateMandateContactPerson`,
      dto
    );
  }

  // PUT /{id}
  update(dto: UpdateMandateContactPersonDto): Observable<MandateContactPerson> {
    return this.http.put<MandateContactPerson>(`${API_BASE}/${dto.id}`, dto);
  }

  // DELETE /{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/${id}`);
  }
}

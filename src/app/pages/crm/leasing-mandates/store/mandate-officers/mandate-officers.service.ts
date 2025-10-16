import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateMandateOfficerDto,
  MandateOfficer,
  PagedResponse,
  UpdateMandateOfficerDto,
} from './mandate-officer.model';

// If you already have environments, swap this for environment.apiBaseUrl
const API_BASE = 'https://lendmate.corplease.com.eg:7070/api/MandateOfficers';

@Injectable({ providedIn: 'root' })
export class MandateOfficersService {
  private http = inject(HttpClient);

  // GET /GetAllMandateOfficers?pageNumber
  getAll(pageNumber?: number): Observable<PagedResponse<MandateOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) params = params.set('pageNumber', pageNumber);
    return this.http.get<PagedResponse<MandateOfficer>>(
      `${API_BASE}/GetAllMandateOfficers`,
      { params }
    );
  }

  // GET /MandateOfficerId?leasingMandate={id}
  // NOTE: The API name is confusing; this endpoint returns a single item by its own id.
  getByMandateOfficerId(id: number): Observable<MandateOfficer> {
    const params = new HttpParams().set('id', id); // matches your swagger
    return this.http.get<MandateOfficer>(`${API_BASE}/MandateOfficerId`, {
      params,
    });
  }

  // GET /MandateId?mandateId={mandateId}
  getByMandateId(mandateId: number): Observable<MandateOfficer[]> {
    const params = new HttpParams().set('mandateId', mandateId);
    return this.http.get<MandateOfficer[]>(`${API_BASE}/MandateId`, { params });
  }

  // POST /CreateMandateOfficer
  create(dto: CreateMandateOfficerDto): Observable<MandateOfficer> {
    return this.http.post<MandateOfficer>(
      `${API_BASE}/CreateMandateOfficer`,
      dto
    );
  }

  // PUT /{id}
  update(dto: UpdateMandateOfficerDto): Observable<MandateOfficer> {
    return this.http.put<MandateOfficer>(`${API_BASE}/${dto.id}`, dto);
  }

  // DELETE /{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ClientCRAuthorityOfficesResponse,
  ClientCRAuthorityOffice,
} from './client-cr-authority-office.model';

@Injectable({ providedIn: 'root' })
export class ClientCRAuthorityOfficeService {
  private baseUrl = '/api/ClientCRAuthorityOffices';

  constructor(private http: HttpClient) {}

  getAll(page: number): Observable<ClientCRAuthorityOfficesResponse> {
    return this.http.get<ClientCRAuthorityOfficesResponse>(
      `${this.baseUrl}/GetAllClientCRAuthorityOffices`,
      { params: { pageNumber: page } }
    );
  }

  getById(id: number): Observable<ClientCRAuthorityOffice> {
    return this.http.get<ClientCRAuthorityOffice>(`${this.baseUrl}/${id}`);
  }

  create(
    data: Partial<ClientCRAuthorityOffice>
  ): Observable<ClientCRAuthorityOffice> {
    return this.http.post<ClientCRAuthorityOffice>(
      `${this.baseUrl}/CreateClientCRAuthorityOffice`,
      data
    );
  }

  update(
    id: number,
    changes: Partial<ClientCRAuthorityOffice>
  ): Observable<ClientCRAuthorityOffice> {
    return this.http.put<ClientCRAuthorityOffice>(
      `${this.baseUrl}/${id}`,
      changes
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

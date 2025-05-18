import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientCRAuthorityOfficesService {
  private api = `${environment.apiUrl}ClientCRAuthorityOffices`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientCRAuthorityOffice>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientCRAuthorityOffice>>(
      `${this.api}/GetAllClientCRAuthorityOffices`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientCRAuthorityOffice>> {
    return this.http.get<PagedResponse<ClientCRAuthorityOffice>>(
      `${this.api}/GetAllClientCRAuthorityOfficesHistory`
    );
  }

  getById(id: number): Observable<ClientCRAuthorityOffice> {
    return this.http.get<ClientCRAuthorityOffice>(
      `${this.api}/ClientCRAuthorityOfficeId?id=${id}`
    );
  }

  create(data: Partial<ClientCRAuthorityOffice>): Observable<ClientCRAuthorityOffice> {
    return this.http.post<ClientCRAuthorityOffice>(
      `${this.api}/CreateClientCRAuthorityOffice`,
      data
    );
  }

  update(id: number, data: Partial<ClientCRAuthorityOffice>): Observable<ClientCRAuthorityOffice> {
    return this.http.put<ClientCRAuthorityOffice>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientCRAuthorityOffice[]> {
    return this.http.get<ClientCRAuthorityOffice[]>(
      `${this.api}/ClientId?id=${clientId}`
    );
  }
}

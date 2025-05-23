// src/app/services/client-guarantors.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ClientGuarantor } from './client-guarantor.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}
@Injectable({ providedIn: 'root' })
export class ClientGuarantorsService {
  private api = `${environment.apiUrl}ClientGuarantors`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientGuarantor>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientGuarantor>>(
      `${this.api}/GetAllClientGuarantors`,
      { params }
    );
  }
  getHistory(): Observable<PagedResponse<ClientGuarantor>> {
    return this.http.get<PagedResponse<ClientGuarantor>>(
      `${this.api}/GetAllClientGuarantorsHistory`
    );
  }
  getById(id: number): Observable<ClientGuarantor> {
    return this.http.get<ClientGuarantor>(`${this.api}/Id?id=${id}`);
  }
  create(data: Partial<ClientGuarantor>): Observable<ClientGuarantor> {
    return this.http.post<ClientGuarantor>(
      `${this.api}/CreateClientGuarantor`,
      data
    );
  }
  update(
    id: number,
    data: Partial<ClientGuarantor>
  ): Observable<ClientGuarantor> {
    return this.http.put<ClientGuarantor>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientGuarantor[]> {
    return this.http.get<ClientGuarantor[]>(
      `${this.api}/ClientId?ClientId=${clientId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientTaxOffice } from './client-tax-office.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientTaxOfficesService {
  private api = `${environment.apiUrl}ClientTaxOffices`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientTaxOffice>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientTaxOffice>>(
      `${this.api}/GetAllClientTaxOffices`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientTaxOffice>> {
    return this.http.get<PagedResponse<ClientTaxOffice>>(
      `${this.api}/GetAllClientTaxOfficesHistory`
    );
  }

  getById(id: number): Observable<ClientTaxOffice> {
    return this.http.get<ClientTaxOffice>(
      `${this.api}/Id?id=${id}`
    );
  }

  create(data: Partial<ClientTaxOffice>): Observable<ClientTaxOffice> {
    return this.http.post<ClientTaxOffice>(
      `${this.api}/CreateClientTaxOffice`,
      data
    );
  }

  update(id: number, data: Partial<ClientTaxOffice>): Observable<ClientTaxOffice> {
    return this.http.put<ClientTaxOffice>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientTaxOffice[]> {
    return this.http.get<ClientTaxOffice[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

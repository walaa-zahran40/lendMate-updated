import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientAddress } from './client-address.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientAddressesService {
  private api = `${environment.apiUrl}ClientsAddresses`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientAddress>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientAddress>>(
      `${this.api}/GetAllClientAddresses`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientAddress>> {
    return this.http.get<PagedResponse<ClientAddress>>(
      `${this.api}/GetAllClientAddressesHistory`
    );
  }

  getById(id: number): Observable<ClientAddress> {
    return this.http.get<ClientAddress>(
      `${this.api}/Id?id=${id}`
    );
  }

  create(data: Partial<ClientAddress>): Observable<ClientAddress> {
    return this.http.post<ClientAddress>(
      `${this.api}/CreateClientAddress`,
      data
    );
  }

  update(id: number, data: Partial<ClientAddress>): Observable<ClientAddress> {
    return this.http.put<ClientAddress>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientAddress[]> {
    return this.http.get<ClientAddress[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

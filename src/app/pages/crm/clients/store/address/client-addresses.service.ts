import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientAddress } from './client-addresses.model';

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientsAddressesService {
  private readonly baseUrl = '/api/ClientsAddresses';
  constructor(private http: HttpClient) {}

  getAll(): Observable<PagedResult<ClientAddress>> {
    return this.http.get<PagedResult<ClientAddress>>(
      `${this.baseUrl}/GetAllClientsAddresses`
    );
  }
  getHistory(): Observable<PagedResult<ClientAddress>> {
    return this.http.get<PagedResult<ClientAddress>>(
      `${this.baseUrl}/GetAllClientsAddressesHistory`
    );
  }
  getByClientId(clientId: number): Observable<PagedResult<ClientAddress>> {
    return this.http.get<PagedResult<ClientAddress>>(
      `${this.baseUrl}/GetByClientId/${clientId}`
    );
  }
  create(address: Partial<ClientAddress>): Observable<ClientAddress> {
    return this.http.post<ClientAddress>(
      `${this.baseUrl}/CreateClientAddress`,
      address
    );
  }
  createBulk(addresses: Partial<ClientAddress>[]): Observable<ClientAddress[]> {
    return this.http.post<ClientAddress[]>(
      `${this.baseUrl}/CreateBulkClientAddress`,
      addresses
    );
  }
  update(
    id: number,
    changes: Partial<ClientAddress>
  ): Observable<ClientAddress> {
    return this.http.put<ClientAddress>(`${this.baseUrl}/${id}`, changes);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

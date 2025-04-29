import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClientIdentity {
  id: number;
  identificationNumber: string;
  identificationTypeId: number;
  clientId: number;
  isMain: boolean;
  isActive: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientIdentitiesService {
  private baseUrl = 'https://192.168.10.67:7070/api/ClientIdentities';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PagedResult<ClientIdentity>> {
    return this.http.get<PagedResult<ClientIdentity>>(
      `${this.baseUrl}/GetAllClientIdentities`
    );
  }

  getByClientId(clientId: number): Observable<ClientIdentity[]> {
    return this.http.get<ClientIdentity[]>(
      `${this.baseUrl}/GetByClientId/${clientId}`
    );
  }

  create(payload: Omit<ClientIdentity, 'id'>): Observable<ClientIdentity> {
    return this.http.post<ClientIdentity>(
      `${this.baseUrl}/CreateClientIdentity`,
      payload
    );
  }

  update(
    id: number,
    payload: Partial<ClientIdentity>
  ): Observable<ClientIdentity> {
    return this.http.put<ClientIdentity>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

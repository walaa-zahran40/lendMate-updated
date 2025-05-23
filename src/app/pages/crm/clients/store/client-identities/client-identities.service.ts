import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientIdentity } from './client-identity.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientIdentitiesService {
  private api = `${environment.apiUrl}ClientIdentities`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientIdentity>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientIdentity>>(
      `${this.api}/GetAllClientIdentities`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientIdentity>> {
    return this.http.get<PagedResponse<ClientIdentity>>(
      `${this.api}/GetAllClientIdentitiesHistory`
    );
  }

  getById(id: number): Observable<ClientIdentity> {
  return this.http.get<ClientIdentity>(`${this.api}/Id`, {
    params: { id: id.toString() }
  });
}


  create(data: Partial<ClientIdentity>): Observable<ClientIdentity> {
    return this.http.post<ClientIdentity>(
      `${this.api}/CreateClientIdentity`,
      data
    );
  }

  update(id: number, data: Partial<ClientIdentity>): Observable<ClientIdentity> {
    return this.http.put<ClientIdentity>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientIdentity[]> {
  return this.http.get<ClientIdentity[]>(
    `${this.api}/GetByClientId/${clientId.toString()}`
  );
}
}


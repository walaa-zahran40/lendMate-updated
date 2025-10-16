import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientTMLOfficer } from './client-tml-officer.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientTMLOfficersService {
  private api = `${environment.apiUrl}ClientTMLOfficer`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientTMLOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientTMLOfficer>>(
      `${this.api}/GetAllClientTMLOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientTMLOfficer>> {
    return this.http.get<PagedResponse<ClientTMLOfficer>>(
      `${this.api}/GetAllClientTMLOfficersHistory`
    );
  }

  getById(id: number): Observable<ClientTMLOfficer> {
    return this.http.get<ClientTMLOfficer>(`${this.api}/${id}`);
  }

  create(data: Partial<ClientTMLOfficer>): Observable<ClientTMLOfficer> {
    return this.http.post<ClientTMLOfficer>(
      `${this.api}/CreateClientTMLOfficer`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ClientTMLOfficer>
  ): Observable<ClientTMLOfficer> {
    return this.http.put<ClientTMLOfficer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientTMLOfficer[]> {
    return this.http.get<ClientTMLOfficer[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

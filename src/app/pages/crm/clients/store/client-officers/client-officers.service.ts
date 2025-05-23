import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientOfficer } from './client-officer.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientOfficersService {
  private api = `${environment.apiUrl}ClientOfficers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientOfficer>>(
      `${this.api}/GetAllClientOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientOfficer>> {
    return this.http.get<PagedResponse<ClientOfficer>>(
      `${this.api}/GetAllClientOfficersHistory`
    );
  }

  getById(id: number): Observable<ClientOfficer> {
    return this.http.get<ClientOfficer>(`${this.api}/clientOfficerId?clientOfficerId=${id}`);
  }

  create(data: Partial<ClientOfficer>): Observable<ClientOfficer> {
    return this.http.post<ClientOfficer>(
      `${this.api}/CreateClientOfficer`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ClientOfficer>
  ): Observable<ClientOfficer> {
    return this.http.put<ClientOfficer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientOfficer[]> {
    return this.http.get<ClientOfficer[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

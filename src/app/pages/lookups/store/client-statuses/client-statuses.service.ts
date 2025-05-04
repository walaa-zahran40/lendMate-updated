import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientStatus } from './client-status.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientStatusesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/ClientStatuses';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientStatus>> {
    let params = new HttpParams();
    if (pageNumber != null)
      params = params.set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse<ClientStatus>>(
      `${this.apiUrl}/GetAllClientStatuses`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientStatus>> {
    return this.http.get<PagedResponse<ClientStatus>>(
      `${this.apiUrl}/GetAllClientStatusesHistory`
    );
  }

  getById(id: number): Observable<ClientStatus> {
    return this.http.get<ClientStatus>(`${this.apiUrl}/ClientStatusId?clientStatusId=${id}`);
  }

  create(data: Partial<ClientStatus>): Observable<ClientStatus> {
    return this.http.post<ClientStatus>(
      `${this.apiUrl}/CreateClientStatus`,
      data
    );
  }

  update(id: number, data: Partial<ClientStatus>): Observable<ClientStatus> {
    return this.http.put<ClientStatus>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

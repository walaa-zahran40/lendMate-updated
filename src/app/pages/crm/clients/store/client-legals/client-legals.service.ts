import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientLegal } from './client-legal.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientLegalsService {
  private api = `${environment.apiUrl}ClientLegals`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientLegal>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientLegal>>(
      `${this.api}/GetAllClientLegals`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientLegal>> {
    return this.http.get<PagedResponse<ClientLegal>>(
      `${this.api}/GetAllClientLegalsHistory`
    );
  }

  getById(id: number): Observable<ClientLegal> {
    return this.http.get<ClientLegal>(`${this.api}/${id}`);
  }

  create(data: Partial<ClientLegal>): Observable<ClientLegal> {
    return this.http.post<ClientLegal>(
      `${this.api}/CreateClientLegal`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ClientLegal>
  ): Observable<ClientLegal> {
    return this.http.put<ClientLegal>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientLegal[]> {
    return this.http.get<ClientLegal[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientSalesTurnover } from './client-sales-turnover.model';

interface PagedResponse {
  items: ClientSalesTurnover[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientSalesTurnoversService {
  private baseUrl = '/api/ClientSalesTurnovers';

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number): Observable<PagedResponse> {
    const params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse>(
      `${this.baseUrl}/GetAllClientSalesTurnovers`,
      { params }
    );
  }

  getHistory(): Observable<ClientSalesTurnover[]> {
    return this.http.get<ClientSalesTurnover[]>(
      `${this.baseUrl}/GetAllClientSalesTurnoversHistory`
    );
  }

  getById(id: number): Observable<ClientSalesTurnover> {
    return this.http.get<ClientSalesTurnover>(`${this.baseUrl}/${id}`);
  }

  getByClientId(clientId: number): Observable<ClientSalesTurnover[]> {
    return this.http.get<ClientSalesTurnover[]>(
      `${this.baseUrl}/GetByClientId/${clientId}`
    );
  }

  create(
    turnover: Partial<ClientSalesTurnover>
  ): Observable<ClientSalesTurnover> {
    return this.http.post<ClientSalesTurnover>(
      `${this.baseUrl}/CreateClientSalesTurnovers`,
      turnover
    );
  }

  update(
    id: number,
    changes: Partial<ClientSalesTurnover>
  ): Observable<ClientSalesTurnover> {
    return this.http.put<ClientSalesTurnover>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

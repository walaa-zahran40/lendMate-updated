import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientSalesTurnover } from './client-sales-turnovers.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientSalesTurnoversService {
  private api = `${environment.apiUrl}ClientSalesTurnovers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientSalesTurnover>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientSalesTurnover>>(
      `${this.api}/GetAllClientSalesTurnovers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientSalesTurnover>> {
    return this.http.get<PagedResponse<ClientSalesTurnover>>(
      `${this.api}/GetAllClientSalesTurnoversHistory`
    );
  }

  getById(id: number): Observable<ClientSalesTurnover> {
    return this.http.get<ClientSalesTurnover>(
      `${this.api}/${id}`
    );
  }

  create(data: Partial<ClientSalesTurnover>): Observable<ClientSalesTurnover> {
    return this.http.post<ClientSalesTurnover>(
      `${this.api}/CreateClientSalesTurnovers`,
      data
    );
  }

  update(id: number, data: Partial<ClientSalesTurnover>): Observable<ClientSalesTurnover> {
    return this.http.put<ClientSalesTurnover>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientSalesTurnover[]> {
    return this.http.get<ClientSalesTurnover[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}


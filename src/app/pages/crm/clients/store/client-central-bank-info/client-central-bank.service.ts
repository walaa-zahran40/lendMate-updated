import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ClientCentralBank,
  ClientCentralBankHistory,
  PagedResultDto,
} from './client-central-bank.model';

@Injectable({ providedIn: 'root' })
export class ClientCentralBankService {
  private readonly api = '/api/ClientCentralBanks';

  constructor(private http: HttpClient) {}

  getAll(pageNumber = 1): Observable<PagedResultDto<ClientCentralBank>> {
    const params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResultDto<ClientCentralBank>>(
      `${this.api}/GetAllClientCentralBanks`,
      { params }
    );
  }

  getHistory(clientId: number): Observable<ClientCentralBankHistory[]> {
    return this.http.get<ClientCentralBankHistory[]>(
      `${this.api}/GetHistory/${clientId}`
    );
  }

  getById(id: number): Observable<ClientCentralBank> {
    return this.http.get<ClientCentralBank>(`${this.api}/${id}`);
  }

  create(payload: Partial<ClientCentralBank>): Observable<ClientCentralBank> {
    return this.http.post<ClientCentralBank>(
      `${this.api}/CreateClientCentralBank`,
      payload
    );
  }

  update(id: number, payload: Partial<ClientCentralBank>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ClientCentralBankInfo } from './client-central-bank.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientCentralBankInfoService {
  private api = `${environment.apiUrl}ClientCentralBanks`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientCentralBankInfo>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientCentralBankInfo>>(
      `${this.api}/GetAllClientCentralBanks`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientCentralBankInfo>> {
    return this.http.get<PagedResponse<ClientCentralBankInfo>>(
      `${this.api}/GetAllClientCentralBanksHistory`
    );
  }

  getById(id: number): Observable<ClientCentralBankInfo> {
    return this.http.get<ClientCentralBankInfo>(
      `${this.api}/Id?id=${id}`
    );
  }

  create(data: Partial<ClientCentralBankInfo>): Observable<ClientCentralBankInfo> {
    return this.http.post<ClientCentralBankInfo>(
      `${this.api}/CreateClientCentralBank`,
      data
    );
  }

  update(id: number, data: Partial<ClientCentralBankInfo>): Observable<ClientCentralBankInfo> {
    return this.http.put<ClientCentralBankInfo>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientCentralBankInfo[]> {
    return this.http.get<ClientCentralBankInfo[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shareholder } from './client-share-holders.model';

@Injectable({
  providedIn: 'root',
})
export class ClientShareholdersService {
  private baseUrl = 'https://192.168.10.67:7070/api/ClientShareHolders';

  constructor(private http: HttpClient) {}
  getAllShareholders(): Observable<Shareholder[]> {
    return this.http.get<Shareholder[]>(`${this.baseUrl}/GetAllShareholders`);
  }
  getShareholders(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/ClientId?ClientId=${clientId}`
    );
  }

  createShareholder(shareholderData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/CreateClientShareHolder`,
      shareholderData
    );
  }

  updateShareholder(id: number, shareholderData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, shareholderData);
  }

  deleteShareholder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  getShareholdersHistory(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/GetAllClientShareHoldersHistory`
    );
  }
}

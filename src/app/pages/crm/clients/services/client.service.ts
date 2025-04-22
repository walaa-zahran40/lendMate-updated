import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../../../shared/interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  constructor(private http: HttpClient) {}

  createClient(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/ClientGeneralSettings/CreateClientGeneralSettings`,
      payload
    );
  }
  deleteClient(id: number): Observable<any> {
    console.log('clicked');
    return this.http.delete(`${this.baseUrl}/Clients/${id}`);
  }
  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(
      `${this.baseUrl}/ClientGeneralSettings/ClientId?clientId=${clientId}`
    );
  }
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(
      `${this.baseUrl}/ClientGeneralSettings/UpdateClientGeneralSettingCommand/${client.id}`,
      client
    );
  }
}

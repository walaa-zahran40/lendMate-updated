import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientIdentity } from '../../../../shared/interfaces/client-identity.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientIdentityService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/ClientIdentities';

  constructor(private http: HttpClient) {}

  getAllClientIdentities(): Observable<any> {
    return this.http.get<ClientIdentity>(
      `${this.apiUrl}/GetAllClientIdentityTypes`
    );
  }
  getByClientId(clientId: number): Observable<ClientIdentity> {
    return this.http.get<ClientIdentity>(
      `${this.apiUrl}/GetByClientId/${clientId}`
    );
  }
}

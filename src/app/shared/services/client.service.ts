import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'https://192.168.10.67:7070/api/Clients';

  constructor(private http: HttpClient) {}

  createClient(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateClient`, payload);
  }
  deleteClient(id: number): Observable<any> {
    console.log('clicked');
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

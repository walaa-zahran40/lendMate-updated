import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientTMLOfficersService {
  private apiUrl = `${environment.apiUrl}ClientTMLOfficer`;

  constructor(private http: HttpClient) {}

  getTMLOfficers(clientId: number): Observable<{ items: any[] }> {
    return this.http.get<{ items: any[] }>(
      `${this.apiUrl}/GetAllClientTMLOfficers?ClientId=${clientId}`
    );
  }

  createTMLOfficer(officerData: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/CreateClientTMLOfficer`,
      officerData
    );
  }

  updateTMLOfficer(id: number, officerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, officerData);
  }

  deleteTMLOfficer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getTMLOfficersHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllClientTMLOfficersHistory`);
  }
}

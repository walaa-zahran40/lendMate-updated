// src/app/services/client-guarantors.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientGuarantorsService {
  private apiUrl = `${environment.apiUrl}ClientGuarantors`;

  constructor(private http: HttpClient) {}

  getGuarantors(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ClientId?ClientId=${clientId}`);
  }

  createGuarantor(guarantorData: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/CreateClientGuarantor`,
      guarantorData
    );
  }

  updateGuarantor(id: number, guarantorData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, guarantorData);
  }

  deleteGuarantor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getGuarantorsHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllClientGuarantorsHistory`);
  }
}

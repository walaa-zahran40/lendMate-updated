import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}

  getAllTypes(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.get<any>(
      environment.apiUrl + `ClientTypes/GetAllClientTypes`,
      { headers }
    );
  }
  createType(typeData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post<any>(
      environment.apiUrl + `ClientTypes/CreateClientType`,
      typeData,
      { headers }
    );
  }

  updateType(typeId: number, typeData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.put<any>(
      environment.apiUrl + `ClientTypes/${typeId}`,
      typeData,
      { headers }
    );
  }
  deleteType(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + `ClientTypes/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Client, ClientWorkFlowAction } from './client.model';
import { environment } from '../../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private baseUrl = `${environment.apiUrl}ClientGeneralSettings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    //
    return this.http
      .get<{ items: Client[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClients`
      )
      .pipe(
        //
        map((resp) => resp.items), // ← pull off the `items` array here
        //
        catchError((err) => {
          console.error('🚀 HTTP error fetching Clients:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/ClientId?clientId=${id}`);
  }

  create(payload: Omit<Client, 'id'>): Observable<Client> {
    return this.http.post<Client>(
      `${this.baseUrl}/CreateClientGeneralSettings`,
      payload
    );
  }

  update(id: number, changes: Partial<Client>): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/UpdateClientGeneralSettingCommand/${id}`,
      changes
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  performWorkflowAction(
    id: number,
    changes: Partial<ClientWorkFlowAction>
  ): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}ClientWorkFlowActions/CreateClientWorkFlowAction`,
      changes
    );
  }
}

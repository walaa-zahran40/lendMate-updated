import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ClientOnboarding } from './client-onboarding.model';
import { environment } from '../../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientsOnboardingService {
  private baseUrl = `${environment.apiUrl}Clients`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientOnboarding[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: ClientOnboarding[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClients`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Clients:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ClientOnboarding> {
    return this.http.get<ClientOnboarding>(
      `${this.baseUrl}/ClientId?clientId=${id}`
    );
  }

  create(payload: Omit<ClientOnboarding, 'id'>): Observable<ClientOnboarding> {
    return this.http.post<ClientOnboarding>(
      `${this.baseUrl}/CreateClient`,
      payload
    );
  }

  update(id: number, changes: Partial<ClientOnboarding>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

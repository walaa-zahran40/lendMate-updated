import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IndividualOnboarding } from './individual-onboarding.model';
import { environment } from '../../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IndividualOnboardingsService {
  private baseUrl = `${environment.apiUrl}ClientIndividualBusinessDetails`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IndividualOnboarding[]> {
    return this.http
      .get<{ items: IndividualOnboarding[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClientIndividualBusinessDetails`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching IndividualOnboardings:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<IndividualOnboarding> {
    return this.http.get<IndividualOnboarding>(`${this.baseUrl}/${id}`);
  }

  create(
    payload: Omit<IndividualOnboarding, 'id'>
  ): Observable<IndividualOnboarding> {
    return this.http.post<IndividualOnboarding>(
      `${this.baseUrl}/CreateClientIndividualBusinessDetails`,
      payload
    );
  }

  update(id: number, changes: Partial<IndividualOnboarding>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Individual } from './individual.model';
import { environment } from '../../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IndividualsService {
  private baseUrl = `${environment.apiUrl}ClientIndividualBusinessDetails`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Individual[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Individual[]; totalCount: number }>(
        `${this.baseUrl}/GetAllClientIndividualBusinessDetails`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Individuals:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Individual> {
    return this.http.get<Individual>(`${this.baseUrl}/${id}`);
  }

  create(payload: Omit<Individual, 'id'>): Observable<Individual> {
    return this.http.post<Individual>(
      `${this.baseUrl}/CreateClientIndividualBusinessDetails`,
      payload
    );
  }

  update(id: number, changes: Partial<Individual>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

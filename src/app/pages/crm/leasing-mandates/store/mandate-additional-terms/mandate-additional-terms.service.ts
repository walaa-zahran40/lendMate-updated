import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateAdditionalTerm } from './mandate-additional-term.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandateAdditionalTermsService {
  private baseUrl = `${environment.apiUrl}MandateAdditionalTerms`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MandateAdditionalTerm[]> {
    return this.http
      .get<{ items: MandateAdditionalTerm[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandateAdditionalTerms`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Mandates:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<MandateAdditionalTerm> {
    return this.http.get<MandateAdditionalTerm>(
      `${this.baseUrl}/MandateId?id=${id}`
    );
  }

  create(
    payload: Omit<MandateAdditionalTerm, 'id'>
  ): Observable<MandateAdditionalTerm> {
    return this.http.post<MandateAdditionalTerm>(
      `${this.baseUrl}/CreateMandateAdditionalTerm`,
      payload
    );
  }

  update(
    id: number,
    changes: Partial<MandateAdditionalTerm>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

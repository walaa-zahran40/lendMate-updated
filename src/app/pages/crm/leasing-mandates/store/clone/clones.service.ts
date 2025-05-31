import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Clone } from './clone.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClonesService {
  private baseUrl = `${environment.apiUrl}LeasingMandates`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Clone[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Clone[]; totalCount: number }>(
        `${this.baseUrl}/GetAllLeasingMandates`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Mandates:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<Clone> {
    return this.http.get<Clone>(
      `${this.baseUrl}/LeasingMandateId?leasingMandate=${id}`
    );
  }

  create(payload: Omit<Clone, 'id'>): Observable<Clone> {
    return this.http.post<Clone>(
      `${this.baseUrl}/CreateLeasingMandate`,
      payload
    );
  }

  update(id: number, changes: Partial<Clone>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

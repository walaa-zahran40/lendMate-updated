import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateOfficer } from './mandate-officer.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MandateOfficersService {
  private baseUrl = `${environment.apiUrl}MandateOfficers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MandateOfficer[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateOfficer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMandateOfficers`
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
  getById(id: number): Observable<MandateOfficer> {
    return this.http.get<MandateOfficer>(
      `${this.baseUrl}/MandateOfficerId?leasingMandate=${id}`
    );
  }
  getByMandateId(id: number): Observable<MandateOfficer> {
    return this.http.get<MandateOfficer>(
      `${this.baseUrl}/MandateId?mandateId=${id}`
    );
  }
  create(payload: Omit<MandateOfficer, 'id'>): Observable<MandateOfficer> {
    return this.http.post<MandateOfficer>(
      `${this.baseUrl}/CreateMandateOfficer`,
      payload
    );
  }

  update(id: number, changes: Partial<MandateOfficer>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

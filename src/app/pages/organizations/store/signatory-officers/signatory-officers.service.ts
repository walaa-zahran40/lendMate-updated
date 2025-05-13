import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SignatoryOfficer } from './signatory-officer.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignatoryOfficersService {
  private baseUrl = `${environment.apiUrl}SignatoryOfficers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SignatoryOfficer[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: SignatoryOfficer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllSignatoryOfficers`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching SignatoryOfficers:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<SignatoryOfficer> {
    return this.http.get<SignatoryOfficer>(`${this.baseUrl}/SignatoryOfficerId?id=${id}`);
  }

  create(payload: Omit<SignatoryOfficer, 'id'>): Observable<SignatoryOfficer> {
    return this.http.post<SignatoryOfficer>(`${this.baseUrl}/CreateSignatoryOfficer`, payload);
  }

  update(id: number, changes: Partial<SignatoryOfficer>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthorityOffice } from './authority-offices.model';

@Injectable({ providedIn: 'root' })
export class AuthorityOfficesService {
  private baseUrl = 'https://192.168.10.67:7070/api/CRAuthorityOffices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuthorityOffice[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: AuthorityOffice[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCRAuthorityOffices`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching AuthorityOffices:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<AuthorityOffice> {
    return this.http.get<AuthorityOffice>(
      `${this.baseUrl}/CRAuthorityOfficeId?crAuthorityOfficeId=${id}`
    );
  }

  create(payload: Omit<AuthorityOffice, 'id'>): Observable<AuthorityOffice> {
    return this.http.post<AuthorityOffice>(
      `${this.baseUrl}/CreateCRAuthorityOffice`,
      payload
    );
  }

  update(id: number, changes: Partial<AuthorityOffice>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

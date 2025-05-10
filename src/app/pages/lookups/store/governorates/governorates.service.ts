import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Governorate } from './governorate.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GovernoratesService {
  private baseUrl = `${environment.apiUrl}Governorates`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Governorate[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: Governorate[]; totalCount: number }>(
        `${this.baseUrl}/GetAllGovernorates`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Governorates:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Governorate> {
    return this.http.get<Governorate>(
      `${this.baseUrl}/GovernorateId?governorateId=${id}`
    );
  }

  create(payload: Omit<Governorate, 'id'>): Observable<Governorate> {
    return this.http.post<Governorate>(
      `${this.baseUrl}/CreateGovernorate`,
      payload
    );
  }

  update(id: number, changes: Partial<Governorate>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

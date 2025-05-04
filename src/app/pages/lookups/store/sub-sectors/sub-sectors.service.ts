import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SubSector } from './sub-sector.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubSectorsService {
  private baseUrl = `${environment.apiUrl}SubSectors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SubSector[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: SubSector[]; totalCount: number }>(
        `${this.baseUrl}/GetAllSubSectors`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching SubSectors:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<SubSector> {
    return this.http.get<SubSector>(`${this.baseUrl}/id?id=${id}`);
  }

  create(payload: Omit<SubSector, 'id'>): Observable<SubSector> {
    return this.http.post<SubSector>(
      `${this.baseUrl}/CreateSubSector`,
      payload
    );
  }

  update(id: number, changes: Partial<SubSector>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

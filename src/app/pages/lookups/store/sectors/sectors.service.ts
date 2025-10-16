import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Sector } from './sector.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SectorsService {
  private baseUrl = `${environment.apiUrl}Sectors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sector[]> {
    return this.http
      .get<{ items: Sector[]; totalCount: number }>(
        `${this.baseUrl}/GetAllSectors`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Sectors:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.baseUrl}/SectorId?id=${id}`);
  }

  create(payload: Omit<Sector, 'id'>): Observable<Sector> {
    return this.http.post<Sector>(`${this.baseUrl}/CreateSector`, payload);
  }

  update(id: number, changes: Partial<Sector>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<Sector[]> {
    return this.http
      .get<{ items: Sector[]; totalCount: number }>(
        `${this.baseUrl}/GetAllSectorsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Sectors:', err);
          return throwError(() => err);
        })
      );
  }
}

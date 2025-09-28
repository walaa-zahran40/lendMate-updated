import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { RentStructureType } from './rent-structure-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RentStructureTypesService {
  private baseUrl = `${environment.apiUrl}RentStructureTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<RentStructureType[]> {
    return this.http
      .get<{ items: RentStructureType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllRentStructureTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching RentStructureTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<RentStructureType> {
    return this.http.get<RentStructureType>(
      `${this.baseUrl}/RentStructureTypeId?id=${id}`
    );
  }

  create(
    payload: Omit<RentStructureType, 'id'>
  ): Observable<RentStructureType> {
    return this.http.post<RentStructureType>(
      `${this.baseUrl}/CreateRentStructureType`,
      payload
    );
  }

  update(id: number, changes: Partial<RentStructureType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<RentStructureType[]> {
    return this.http
      .get<{ items: RentStructureType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllRentStructureTypesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching RentStructureTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

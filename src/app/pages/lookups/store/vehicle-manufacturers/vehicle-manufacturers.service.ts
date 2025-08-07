import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { VehicleManufacturer } from './vehicle-manufacturer.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleManufacturersService {
  private baseUrl = `${environment.apiUrl}VehiclesManufactures`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VehicleManufacturer[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: VehicleManufacturer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVehiclesManufactures`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching VehicleManufacturers:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<VehicleManufacturer[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: VehicleManufacturer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVehicleManufacturersHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching VehicleManufacturers:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<VehicleManufacturer> {
    return this.http.get<VehicleManufacturer>(
      `${this.baseUrl}/VehiclesManufactureId?id=${id}`
    );
  }

  create(
    payload: Omit<VehicleManufacturer, 'id'>
  ): Observable<VehicleManufacturer> {
    return this.http.post<VehicleManufacturer>(
      `${this.baseUrl}/CreateVehiclesManufacture`,
      payload
    );
  }

  update(id: number, changes: Partial<VehicleManufacturer>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

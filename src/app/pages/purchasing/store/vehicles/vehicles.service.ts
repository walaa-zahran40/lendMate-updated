import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Vehicle } from './vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private baseUrl = `${environment.apiUrl}Vehicles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http
      .get<{ items: Vehicle[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVehicles`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Vehicles:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<Vehicle[]> {
    return this.http
      .get<{ items: Vehicle[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPassengerVehiclesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Vehicles:', err);
          return throwError(() => err);
        })
      );
  }
  getByAssetId(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/assetId?assetId=${id}`);
  }

  create(payload: Omit<Vehicle, 'id'>): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/CreateVehicle`, payload);
  }

  update(id: number, changes: Partial<Vehicle>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

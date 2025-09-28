import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { VehicleModel } from './vehicle-model.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleModelsService {
  private baseUrl = `${environment.apiUrl}VehiclesModels`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VehicleModel[]> {
    return this.http
      .get<{ items: VehicleModel[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVehiclesModels`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching VehicleModels:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<VehicleModel[]> {
    return this.http
      .get<{ items: VehicleModel[]; totalCount: number }>(
        `${this.baseUrl}/GetAllVehicleModelsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching VehicleModels:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(
      `${this.baseUrl}/VehiclesModelId?id=${id}`
    );
  }

  create(payload: Omit<VehicleModel, 'id'>): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(
      `${this.baseUrl}/CreateVehiclesModel`,
      payload
    );
  }

  update(id: number, changes: Partial<VehicleModel>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

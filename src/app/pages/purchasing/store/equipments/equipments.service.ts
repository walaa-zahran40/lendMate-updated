import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Equipment } from './equipment.model';

@Injectable({ providedIn: 'root' })
export class EquipmentsService {
  private baseUrl = `${environment.apiUrl}MachinesAndEquipments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipment[]> {
    return this.http
      .get<{ items: Equipment[]; totalCount: number }>(
        `${this.baseUrl}/GetAllEquipments`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Equipments:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<Equipment[]> {
    return this.http
      .get<{ items: Equipment[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPassengerEquipmentsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Equipments:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/EquipmentId?id=${id}`);
  }
  getByAssetId(id: number): Observable<Equipment> {
    const url = `${this.baseUrl}/assetId?assetId=${id}`;
    console.log('[EquipmentsService] GET', url);
    return this.http.get<Equipment>(url).pipe(
      tap((resp) => console.log('[EquipmentsService] GET OK', resp)),
      catchError((err) => {
        console.error('[EquipmentsService] GET FAIL', err);
        return throwError(() => err);
      })
    );
  }

  create(payload: Omit<Equipment, 'id'>): Observable<Equipment> {
    return this.http.post<Equipment>(
      `${this.baseUrl}/CreateMachinesAndEquipment`,
      payload
    );
  }

  update(id: number, changes: Partial<Equipment>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

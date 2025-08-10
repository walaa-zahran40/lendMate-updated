import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Equipment } from './equipment.model';

@Injectable({ providedIn: 'root' })
export class EquipmentsService {
  private baseUrl = `${environment.apiUrl}Equipments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipment[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Equipment[]; totalCount: number }>(
        `${this.baseUrl}/GetAllEquipments`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Equipments:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<Equipment[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Equipment[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPassengerEquipmentsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Equipments:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/EquipmentId?id=${id}`);
  }

  create(payload: Omit<Equipment, 'id'>): Observable<Equipment> {
    return this.http.post<Equipment>(
      `${this.baseUrl}/CreateEquipment`,
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

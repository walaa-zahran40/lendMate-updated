import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Property } from './property.model';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  private baseUrl = `${environment.apiUrl}MachinesAndProperties`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Property[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Property[]; totalCount: number }>(
        `${this.baseUrl}/GetAllProperties`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Properties:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<Property[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Property[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPassengerPropertiesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Properties:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/PropertyId?id=${id}`);
  }
  getByAssetId(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/assetId?assetId=${id}`);
  }

  create(payload: Omit<Property, 'id'>): Observable<Property> {
    return this.http.post<Property>(
      `${this.baseUrl}/CreateMachinesAndProperty`,
      payload
    );
  }

  update(id: number, changes: Partial<Property>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

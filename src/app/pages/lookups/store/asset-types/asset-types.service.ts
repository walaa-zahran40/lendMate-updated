import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AssetType } from './asset-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssetTypesService {
  private baseUrl = `${environment.apiUrl}AssetTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AssetType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: AssetType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching AssetTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<AssetType> {
    return this.http.get<AssetType>(`${this.baseUrl}/AssetTypeId?id=${id}`);
  }

  create(payload: Omit<AssetType, 'id'>): Observable<AssetType> {
    return this.http.post<AssetType>(
      `${this.baseUrl}/CreateAssetType`,
      payload
    );
  }

  update(id: number, changes: Partial<AssetType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<AssetType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: AssetType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching AssetTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

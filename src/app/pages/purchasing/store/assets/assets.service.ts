import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Asset } from './asset.model';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private baseUrl = `${environment.apiUrl}Assets`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Asset[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Asset[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssets`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Assets:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<Asset[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Asset[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Assets:', err);
          return throwError(() => err);
        })
      );
  }
  // assets.service.ts
  getById(id: number): Observable<Asset> {
    const url = `${this.baseUrl}/AssetId?id=${id}`; // <- check endpoint name
    console.log('[AssetsService] GET', url);
    return this.http.get<any>(url).pipe(
      tap((raw) => console.log('[AssetsService] raw response:', raw)),
      // 🔧 If your API wraps the entity, unwrap it here:
      map((raw) => {
        // common patterns – adjust to your backend
        if (raw?.item) return raw.item; // { item: Asset }
        if (raw?.data) return raw.data; // { data: Asset }
        if (Array.isArray(raw)) return raw[0]; // [Asset]
        return raw as Asset; // plain Asset
      }),
      tap((entity) => console.log('[AssetsService] mapped Asset:', entity)),
      catchError((err) => {
        console.error('[AssetsService] GET FAIL', err);
        return throwError(() => err);
      })
    );
  }

  create(payload: Omit<Asset, 'id'>): Observable<Asset> {
    return this.http.post<Asset>(`${this.baseUrl}/CreateAsset`, payload);
  }

  update(id: number, changes: Partial<Asset>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

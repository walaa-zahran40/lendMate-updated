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
  getById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.baseUrl}/AssetId?id=${id}`);
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

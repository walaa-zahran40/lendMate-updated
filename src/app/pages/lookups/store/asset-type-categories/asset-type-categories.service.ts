import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AssetTypeCategory } from './asset-type-category.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssetTypeCategoriesService {
  private baseUrl = `${environment.apiUrl}AssetTypeCategories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AssetTypeCategory[]> {
    return this.http
      .get<{ items: AssetTypeCategory[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetTypeCategories`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching AssetTypeCategories:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<AssetTypeCategory> {
    return this.http.get<AssetTypeCategory>(
      `${this.baseUrl}/AssetTypeCategoryId?id=${id}`
    );
  }

  create(
    payload: Omit<AssetTypeCategory, 'id'>
  ): Observable<AssetTypeCategory> {
    return this.http.post<AssetTypeCategory>(
      `${this.baseUrl}/CreateAssetTypeCategory`,
      payload
    );
  }

  update(id: number, changes: Partial<AssetTypeCategory>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<AssetTypeCategory[]> {
    return this.http
      .get<{ items: AssetTypeCategory[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetTypeCategoriesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching AssetTypeCategories:', err);
          return throwError(() => err);
        })
      );
  }
}

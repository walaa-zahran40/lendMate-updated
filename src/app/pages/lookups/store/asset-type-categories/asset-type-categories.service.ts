import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetTypeCategory } from './asset-type-category.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class AssetTypeCategoriesService {
  private api = `${environment.apiUrl}AssetTypeCategories`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<AssetTypeCategory>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<AssetTypeCategory>>(
      `${this.api}/GetAllAssetTypeCategories`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<AssetTypeCategory>> {
    return this.http.get<PagedResponse<AssetTypeCategory>>(
      `${this.api}/GetAllAssetTypeCategoriesHistory`
    );
  }

  getById(id: number): Observable<AssetTypeCategory> {
    return this.http.get<AssetTypeCategory>(
      `${this.api}/AssetTypeCategoryId?id=${id}`
    );
  }

  create(data: Partial<AssetTypeCategory>): Observable<AssetTypeCategory> {
    return this.http.post<AssetTypeCategory>(
      `${this.api}/CreateAssetTypeCategory`,
      data
    );
  }

  update(
    id: number,
    data: Partial<AssetTypeCategory>
  ): Observable<AssetTypeCategory> {
    return this.http.put<AssetTypeCategory>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

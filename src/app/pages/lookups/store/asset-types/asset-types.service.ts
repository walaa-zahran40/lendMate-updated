import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetType } from './asset-type.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class AssetTypesService {
  private api = 'https://192.168.10.67:7070/api/AssetTypes';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<AssetType>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<AssetType>>(
      `${this.api}/GetAllAssetTypes`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<AssetType>> {
    return this.http.get<PagedResponse<AssetType>>(
      `${this.api}/GetAllAssetTypesHistory`
    );
  }

  getById(id: number): Observable<AssetType> {
    return this.http.get<AssetType>(`${this.api}/AssetTypeId?id=${id}`);
  }

  create(data: Partial<AssetType>): Observable<AssetType> {
    return this.http.post<AssetType>(`${this.api}/CreateAssetType`, data);
  }

  update(id: number, data: Partial<AssetType>): Observable<AssetType> {
    return this.http.put<AssetType>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

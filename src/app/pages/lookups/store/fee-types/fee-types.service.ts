import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeeType } from './fee-type.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class FeeTypesService {
  private api = `${environment.apiUrl}FeeTypes`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<FeeType>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<FeeType>>(
      `${this.api}/GetAllFeeTypes`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<FeeType>> {
    return this.http.get<PagedResponse<FeeType>>(
      `${this.api}/GetAllFeeTypesHistory`
    );
  }

  getById(id: number): Observable<FeeType> {
    return this.http.get<FeeType>(`${this.api}/FeeTypeId?id=${id}`);
  }

  create(data: Partial<FeeType>): Observable<FeeType> {
    return this.http.post<FeeType>(`${this.api}/CreateFeeType`, data);
  }

  update(id: number, data: Partial<FeeType>): Observable<FeeType> {
    return this.http.put<FeeType>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

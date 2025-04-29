import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyType } from './fee-calculation-types.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class CompanyTypesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/CompanyTypes';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<CompanyType>> {
    let params = new HttpParams();
    if (pageNumber != null)
      params = params.set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse<CompanyType>>(
      `${this.apiUrl}/GetAllCompanyTypes`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<CompanyType>> {
    return this.http.get<PagedResponse<CompanyType>>(
      `${this.apiUrl}/GetAllCompanyTypesHistory`
    );
  }

  getById(id: number): Observable<CompanyType> {
    return this.http.get<CompanyType>(`${this.apiUrl}/CompanyTypeId?id=${id}`);
  }

  create(data: Partial<CompanyType>): Observable<CompanyType> {
    return this.http.post<CompanyType>(
      `${this.apiUrl}/CreateCompanyType`,
      data
    );
  }

  update(id: number, data: Partial<CompanyType>): Observable<CompanyType> {
    return this.http.put<CompanyType>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CompanyType } from './company-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyTypesService {
  private baseUrl = `${environment.apiUrl}CompanyTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CompanyType[]> {
    return this.http
      .get<{ items: CompanyType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCompanyTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching CompanyTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<CompanyType> {
    return this.http.get<CompanyType>(`${this.baseUrl}/CompanyTypeId?id=${id}`);
  }

  create(payload: Omit<CompanyType, 'id'>): Observable<CompanyType> {
    return this.http.post<CompanyType>(
      `${this.baseUrl}/CreateCompanyType`,
      payload
    );
  }

  update(id: number, changes: Partial<CompanyType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<CompanyType[]> {
    return this.http
      .get<{ items: CompanyType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllCompanyTypesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error('🚀 HTTP error fetching CompanyTypes:', err);
          return throwError(() => err);
        })
      );
  }
}

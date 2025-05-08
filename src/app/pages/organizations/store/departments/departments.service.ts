import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './department.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class DepartmentsService {
  private api = `${environment.apiUrl}Departments`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Department>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<Department>>(
      `${this.api}/GetAllDepartments`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Department>> {
    return this.http.get<PagedResponse<Department>>(
      `${this.api}/GetAllDepartmentsHistory`
    );
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.api}/DepartmentId?id=${id}`);
  }

  create(data: Partial<Department>): Observable<Department> {
    return this.http.post<Department>(`${this.api}/CreateDepartment`, data);
  }

  update(id: number, data: Partial<Department>): Observable<Department> {
    return this.http.put<Department>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

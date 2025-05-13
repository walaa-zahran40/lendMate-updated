import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentManager } from './department-manager.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class DepartmentManagersService {
  private api = `${environment.apiUrl}DepartmentManagers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<DepartmentManager>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<DepartmentManager>>(
      `${this.api}/GetAllDepartmentManagers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<DepartmentManager>> {
    return this.http.get<PagedResponse<DepartmentManager>>(
      `${this.api}/GetAllDepartmentManagersHistory`
    );
  }

  getById(id: number): Observable<DepartmentManager> {
    return this.http.get<DepartmentManager>(
      `${this.api}/DepartmentsManagerId?id=${id}`
    );
  }

  create(
    data: Partial<DepartmentManager>
  ): Observable<DepartmentManager> {
    return this.http.post<DepartmentManager>(
      `${this.api}/CreateDepartmentsManager`,
      data
    );
  }

  update(
    id: number,
    data: Partial<DepartmentManager>
  ): Observable<DepartmentManager> {
    return this.http.put<DepartmentManager>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByDepartmentId(departmentId: number): Observable<DepartmentManager[]> {
    return this.http.get<DepartmentManager[]>(
      `${this.api}/GetManagerIdByDepartmentId?departmentId=${departmentId}`
    );
  }
}

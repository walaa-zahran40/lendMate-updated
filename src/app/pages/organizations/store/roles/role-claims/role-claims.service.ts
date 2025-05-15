import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleClaim } from './role-claim.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class RoleClaimsService {
  private api = `${environment.apiUrl}ApplicationRoleClaims`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<RoleClaim>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<RoleClaim>>(
      `${this.api}/GetAllRoleClaims`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<RoleClaim>> {
    return this.http.get<PagedResponse<RoleClaim>>(
      `${this.api}/GetAllRoleClaimsHistory`
    );
  }

  getById(id: number): Observable<RoleClaim> {
    return this.http.get<RoleClaim>(`${this.api}/RoleesAddressId?id=${id}`);
  }

  create(data: Partial<RoleClaim>): Observable<RoleClaim> {
    return this.http.post<RoleClaim>(`${this.api}/CreateRoleesAddress`, data);
  }

  update(id: number, data: Partial<RoleClaim>): Observable<RoleClaim> {
    return this.http.put<RoleClaim>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByRoleId(RoleId: number): Observable<RoleClaim[]> {
    return this.http.get<RoleClaim[]>(
      `${this.api}/ApplicationRoleId?applicationRoleId=${RoleId}`
    );
  }
}

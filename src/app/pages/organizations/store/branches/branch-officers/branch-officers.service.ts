import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchOfficer } from './branch-officer.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class BranchOfficersService {
  private api = `${environment.apiUrl}BranchesOfficers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<BranchOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<BranchOfficer>>(
      `${this.api}/GetAllBranchOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<BranchOfficer>> {
    return this.http.get<PagedResponse<BranchOfficer>>(
      `${this.api}/GetAllBranchOfficersHistory`
    );
  }

  getById(id: number): Observable<BranchOfficer> {
    return this.http.get<BranchOfficer>(
      `${this.api}/BranchesOfficerId?id=${id}`
    );
  }

  create(data: Partial<BranchOfficer>): Observable<BranchOfficer> {
    return this.http.post<BranchOfficer>(
      `${this.api}/CreateBranchesOfficer`,
      data
    );
  }

  update(id: number, data: Partial<BranchOfficer>): Observable<BranchOfficer> {
    return this.http.put<BranchOfficer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByBranchId(branchId: number): Observable<BranchOfficer[]> {
    return this.http.get<BranchOfficer[]>(
      `${this.api}/GetBranchOfficersByBranchId?branchId=${branchId}`
    );
  }
}

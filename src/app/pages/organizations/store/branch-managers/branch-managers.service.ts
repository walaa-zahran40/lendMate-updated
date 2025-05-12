import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchManager } from './branch-manager.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class BranchManagersService {
  private api = `${environment.apiUrl}BranchesManagers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<BranchManager>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<BranchManager>>(
      `${this.api}/GetAllBranchManagers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<BranchManager>> {
    return this.http.get<PagedResponse<BranchManager>>(
      `${this.api}/GetAllBranchManagersHistory`
    );
  }

  getById(id: number): Observable<BranchManager> {
    return this.http.get<BranchManager>(
      `${this.api}/BranchesManagerId?id=${id}`
    );
  }

  create(
    data: Partial<BranchManager>
  ): Observable<BranchManager> {
    return this.http.post<BranchManager>(
      `${this.api}/CreateBranchesManager`,
      data
    );
  }

  update(
    id: number,
    data: Partial<BranchManager>
  ): Observable<BranchManager> {
    return this.http.put<BranchManager>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByBranchId(branchId: number): Observable<BranchManager[]> {
    return this.http.get<BranchManager[]>(
      `${this.api}/GetBranchManagersByBranchId?branchId=${branchId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchAddress } from './branch-address.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class BranchAddressesService {
  private api = `${environment.apiUrl}BranchesAddresses`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<BranchAddress>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<BranchAddress>>(
      `${this.api}/GetAllBranchAddresses`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<BranchAddress>> {
    return this.http.get<PagedResponse<BranchAddress>>(
      `${this.api}/GetAllBranchAddressesHistory`
    );
  }

  getById(id: number): Observable<BranchAddress> {
    return this.http.get<BranchAddress>(
      `${this.api}/BranchesAddressId?id=${id}`
    );
  }

  create(data: Partial<BranchAddress>): Observable<BranchAddress> {
    return this.http.post<BranchAddress>(
      `${this.api}/CreateBranchesAddress`,
      data
    );
  }

  update(id: number, data: Partial<BranchAddress>): Observable<BranchAddress> {
    return this.http.put<BranchAddress>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByBranchId(branchId: number): Observable<BranchAddress[]> {
    return this.http.get<BranchAddress[]>(
      `${this.api}/BranchId?id=${branchId}`
    );
  }
}

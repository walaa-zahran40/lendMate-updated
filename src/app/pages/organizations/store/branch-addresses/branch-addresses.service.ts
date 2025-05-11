import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchAddress } from './branch-addresses.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class BranchAddressesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/BranchesAddresses';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<BranchAddress>> {
    let params = new HttpParams();
    if (pageNumber != null)
      params = params.set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse<BranchAddress>>(
      `${this.apiUrl}/GetAllBranchesAddresses`,
      { params }
    );
  }

  getAllByBranchId(id: number): Observable<BranchAddress[]> {
    return this.http.get<BranchAddress[]>(
      `${this.apiUrl}/BranchId?id=${id}`
    );
  }

  getHistory(): Observable<PagedResponse<BranchAddress>> {
    return this.http.get<PagedResponse<BranchAddress>>(
      `${this.apiUrl}/GetAllBranchesAddressesHistory`
    );
  }

  getById(id: number): Observable<BranchAddress> {
    return this.http.get<BranchAddress>(`${this.apiUrl}/BranchesAddressId?id=${id}`);
  }

  create(data: Partial<BranchAddress>): Observable<BranchAddress> {
    return this.http.post<BranchAddress>(
      `${this.apiUrl}/CreateBranchesAddress`,
      data
    );
  }

  update(id: number, data: Partial<BranchAddress>): Observable<BranchAddress> {
    return this.http.put<BranchAddress>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

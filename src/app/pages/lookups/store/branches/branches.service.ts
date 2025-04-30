import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Branch } from './branch.model';

@Injectable({ providedIn: 'root' })
export class BranchesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/Branches';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Branch[]> {
    return this.http
      .get<{ items: Branch[]; totalCount: number }>(
        `${this.apiUrl}/GetAllBranches`
      )
      .pipe(
        map((resp) => resp.items), // <-- this is an array
        catchError((err) => throwError(() => err))
      );
  }

  getHistory(): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/GetAllBranchesHistory`);
  }

  getById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/BranchId?id=${id}`);
  }

  create(data: Partial<Branch>): Observable<Branch> {
    return this.http.post<Branch>(`${this.apiUrl}/CreateBranch`, data);
  }

  update(id: number, data: Partial<Branch>): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

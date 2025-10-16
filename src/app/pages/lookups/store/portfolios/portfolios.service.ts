import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Portfolio } from './portfolio.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfoliosService {
  private baseUrl = `${environment.apiUrl}Portfolios`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Portfolio[]> {
    return this.http
      .get<{ items: Portfolio[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPortfolios`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<Portfolio[]> {
    return this.http
      .get<{ items: Portfolio[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPortfoliosHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Portfolios:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.baseUrl}/PortfolioId?id=${id}`);
  }

  create(payload: Omit<Portfolio, 'id'>): Observable<Portfolio> {
    return this.http.post<Portfolio>(
      `${this.baseUrl}/CreatePortfolio`,
      payload
    );
  }

  update(id: number, changes: Partial<Portfolio>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

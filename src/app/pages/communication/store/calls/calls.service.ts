import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Call } from './call.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CallsService {
  private baseUrl = `${environment.apiUrl}Calls`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Call[]> {
    return this.http
      .get<{ items: Call[]; totalCount: number }>(`${this.baseUrl}/GetAllCalls`)
      .pipe(
        map((resp) => resp.items),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Call> {
    return this.http.get<Call>(`${this.baseUrl}/CallId?callId=${id}`);
  }

  create(payload: Omit<Call, 'id'>): Observable<Call> {
    return this.http.post<Call>(`${this.baseUrl}/CreateCall`, payload);
  }

  update(id: number, changes: Partial<Call>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  deleteBulk(ids: number[]): Observable<void> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.delete<void>(`${this.baseUrl}/DeleteBulk`, { params });
  }
}

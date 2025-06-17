import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateStatus } from './mandate-status.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class MandateStatusesService {
  private api = `${environment.apiUrl}MandateStatuses`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<MandateStatus>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<MandateStatus>>(
      `${this.api}/GetAllMandateStatuses`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<MandateStatus>> {
    return this.http.get<PagedResponse<MandateStatus>>(
      `${this.api}/GetAllMandateStatusesHistory`
    );
  }

  getById(id: number): Observable<MandateStatus> {
    return this.http.get<MandateStatus>(
      `${this.api}/MandateStatusId?mandateStatusId=${id}`
    );
  }

  create(data: Partial<MandateStatus>): Observable<MandateStatus> {
    return this.http.post<MandateStatus>(
      `${this.api}/CreateMandateStatus`,
      data
    );
  }

  update(id: number, data: Partial<MandateStatus>): Observable<MandateStatus> {
    return this.http.put<MandateStatus>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  //History management
  getAllHistory(): Observable<MandateStatus[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateStatus[]; totalCount: number }>(
        `${this.api}/GetAllMandateStatusesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching MandateStatuses:', err);
          return throwError(() => err);
        })
      );
  }
}

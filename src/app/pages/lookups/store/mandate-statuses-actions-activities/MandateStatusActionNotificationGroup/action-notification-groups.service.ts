import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateActionNotificationGroup } from './action-notification-group.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class MandateActionNotificationGroupsService {
  private api = `${environment.apiUrl}MandateStatusActionNotificationGroups`;

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<MandateActionNotificationGroup>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<MandateActionNotificationGroup>>(
      `${this.api}/GetAllMandateStatusActionNotificationGroups`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<MandateActionNotificationGroup>> {
    return this.http.get<PagedResponse<MandateActionNotificationGroup>>(
      `${this.api}/GetAllMandateStatusActionNotificationGroupsHistory`
    );
  }

  getById(id: number): Observable<MandateActionNotificationGroup> {
    return this.http.get<MandateActionNotificationGroup>(
      `${this.api}/MandateStatusActionNotificationGroupId?id=${id}`
    );
  }

  create(
    data: Partial<MandateActionNotificationGroup>
  ): Observable<MandateActionNotificationGroup> {
    return this.http.post<MandateActionNotificationGroup>(
      `${this.api}/CreateMandateStatusActionNotificationGroup`,
      data
    );
  }

  update(
    id: number,
    data: Partial<MandateActionNotificationGroup>
  ): Observable<MandateActionNotificationGroup> {
    return this.http.put<MandateActionNotificationGroup>(
      `${this.api}/${id}`,
      data
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByMandateStatusActionId(
    mandateId: number
  ): Observable<MandateActionNotificationGroup[]> {
    return this.http.get<MandateActionNotificationGroup[]>(
      `${this.api}/GetMandateStatusActionNotificationGroupsByMandateStatusActionId?actionId=${mandateId}`
    );
  }
  //History management
  getAllHistory(): Observable<MandateActionNotificationGroup[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: MandateActionNotificationGroup[]; totalCount: number }>(
        `${this.api}/GetAllMandateStatusActionNotificationGroupsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching MandateActionNotificationGroups:',
            err
          );
          return throwError(() => err);
        })
      );
  }
}

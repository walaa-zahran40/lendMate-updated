import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ActionNotificationGroup } from './action-notification-group.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ActionNotificationGroupsService {
  private api = `${environment.apiUrl}ClientStatusActionNotificationGroups`;

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<ActionNotificationGroup>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ActionNotificationGroup>>(
      `${this.api}/GetAllClientStatusActionNotificationGroups`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ActionNotificationGroup>> {
    return this.http.get<PagedResponse<ActionNotificationGroup>>(
      `${this.api}/GetAllClientStatusActionNotificationGroupsHistory`
    );
  }

  getById(id: number): Observable<ActionNotificationGroup> {
    return this.http.get<ActionNotificationGroup>(
      `${this.api}/ClientStatusActionNotificationGroupId?id=${id}`
    );
  }

  create(
    data: Partial<ActionNotificationGroup>
  ): Observable<ActionNotificationGroup> {
    return this.http.post<ActionNotificationGroup>(
      `${this.api}/CreateClientStatusActionNotificationGroup`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ActionNotificationGroup>
  ): Observable<ActionNotificationGroup> {
    return this.http.put<ActionNotificationGroup>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientStatusActionId(
    clientId: number
  ): Observable<ActionNotificationGroup[]> {
    return this.http.get<ActionNotificationGroup[]>(
      `${this.api}/GetClientStatusActionNotificationGroupsByClientStatusActionId?actionId=${clientId}`
    );
  }
  //History management
  getAllHistory(): Observable<ActionNotificationGroup[]> {
    return this.http
      .get<{ items: ActionNotificationGroup[]; totalCount: number }>(
        `${this.api}/GetAllClientStatusActionNotificationGroupsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching ActionNotificationGroups:',
            err
          );
          return throwError(() => err);
        })
      );
  }
}

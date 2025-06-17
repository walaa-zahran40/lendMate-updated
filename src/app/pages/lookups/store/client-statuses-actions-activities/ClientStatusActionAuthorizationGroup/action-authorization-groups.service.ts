import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ActionAuthorizationGroup } from './action-authorization-group.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ActionAuthorizationGroupsService {
  private api = `${environment.apiUrl}ClientStatusActionAuthorizationGroups`;

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<ActionAuthorizationGroup>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ActionAuthorizationGroup>>(
      `${this.api}/GetAllClientStatusActionAuthorizationGroups`,
      { params }
    );
  }

  //History management
  getAllHistory(): Observable<ActionAuthorizationGroup[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: ActionAuthorizationGroup[]; totalCount: number }>(
        `${this.api}/GetAllClientStatusActionAuthorizationGroupsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching ClientStatusActions:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<ActionAuthorizationGroup> {
    return this.http.get<ActionAuthorizationGroup>(
      `${this.api}/ClientStatusActionAuthorizationGroupId?id=${id}`
    );
  }

  create(
    data: Partial<ActionAuthorizationGroup>
  ): Observable<ActionAuthorizationGroup> {
    return this.http.post<ActionAuthorizationGroup>(
      `${this.api}/CreateClientStatusActionAuthorizationGroup`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ActionAuthorizationGroup>
  ): Observable<ActionAuthorizationGroup> {
    return this.http.put<ActionAuthorizationGroup>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientStatusActionId(
    clientId: number
  ): Observable<ActionAuthorizationGroup[]> {
    return this.http.get<ActionAuthorizationGroup[]>(
      `${this.api}/GetClientStatusActionAuthorizationGroupsByClientStatusActionId?actionId=${clientId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MandateActionAuthorizationGroup } from './action-authorization-group.model';
import { environment } from '../../../../../../environments/environment';
import { ActionAuthorizationGroup } from '../../client-statuses-actions-activities/ClientStatusActionAuthorizationGroup/action-authorization-group.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class MandateActionAuthorizationGroupsService {
  private api = `${environment.apiUrl}MandateStatusActionAuthorizationGroups`;

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number
  ): Observable<PagedResponse<MandateActionAuthorizationGroup>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<MandateActionAuthorizationGroup>>(
      `${this.api}/GetAllMandateStatusActionAuthorizationGroups`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<MandateActionAuthorizationGroup>> {
    return this.http.get<PagedResponse<MandateActionAuthorizationGroup>>(
      `${this.api}/GetAllMandateStatusActionAuthorizationGroupsHistory`
    );
  }

  getById(id: number): Observable<MandateActionAuthorizationGroup> {
    return this.http.get<MandateActionAuthorizationGroup>(
      `${this.api}/MandateStatusActionAuthorizationGroupId?id=${id}`
    );
  }

  create(
    data: Partial<MandateActionAuthorizationGroup>
  ): Observable<MandateActionAuthorizationGroup> {
    return this.http.post<MandateActionAuthorizationGroup>(
      `${this.api}/CreateMandateStatusActionAuthorizationGroup`,
      data
    );
  }

  update(
    id: number,
    data: Partial<MandateActionAuthorizationGroup>
  ): Observable<MandateActionAuthorizationGroup> {
    return this.http.put<MandateActionAuthorizationGroup>(
      `${this.api}/${id}`,
      data
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByMandateStatusActionId(
    mandateId: number
  ): Observable<MandateActionAuthorizationGroup[]> {
    return this.http.get<MandateActionAuthorizationGroup[]>(
      `${this.api}/GetMandateStatusActionAuthorizationGroupsByMandateStatusActionId?actionId=${mandateId}`
    );
  }
  //History management
  getAllHistory(): Observable<ActionAuthorizationGroup[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: ActionAuthorizationGroup[]; totalCount: number }>(
        `${this.api}/GetAllActionAuthorizationGroupsHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching ActionAuthorizationGroups:',
            err
          );
          return throwError(() => err);
        })
      );
  }
}

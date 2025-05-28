import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getAll(pageNumber?: number): Observable<PagedResponse<ActionAuthorizationGroup>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ActionAuthorizationGroup>>(
      `${this.api}/GetAllClientStatusActionAuthorizationGroups`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ActionAuthorizationGroup>> {
    return this.http.get<PagedResponse<ActionAuthorizationGroup>>(
      `${this.api}/GetAllClientStatusActionAuthorizationGroupsHistory`
    );
  }

  getById(id: number): Observable<ActionAuthorizationGroup> {
    return this.http.get<ActionAuthorizationGroup>(`${this.api}/ClientStatusActionAuthorizationGroupId?id=${id}`);
  }

  create(data: Partial<ActionAuthorizationGroup>): Observable<ActionAuthorizationGroup> {
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
  getByClientStatusActionId(clientId: number): Observable<ActionAuthorizationGroup[]> {
    return this.http.get<ActionAuthorizationGroup[]>(
      `${this.api}/GetClientStatusActionAuthorizationGroupsByClientStatusActionId?actionId=${clientId}`
    );
  }
}

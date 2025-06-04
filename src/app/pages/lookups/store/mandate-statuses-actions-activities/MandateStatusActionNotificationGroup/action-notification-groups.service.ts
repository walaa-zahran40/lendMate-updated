import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getAll(pageNumber?: number): Observable<PagedResponse<MandateActionNotificationGroup>> {
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
    return this.http.get<MandateActionNotificationGroup>(`${this.api}/MandateStatusActionNotificationGroupId?id=${id}`);
  }

  create(data: Partial<MandateActionNotificationGroup>): Observable<MandateActionNotificationGroup> {
    return this.http.post<MandateActionNotificationGroup>(
      `${this.api}/CreateMandateStatusActionNotificationGroup`,
      data
    );
  }

  update(
    id: number,
    data: Partial<MandateActionNotificationGroup>
  ): Observable<MandateActionNotificationGroup> {
    return this.http.put<MandateActionNotificationGroup>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByMandateStatusActionId(mandateId: number): Observable<MandateActionNotificationGroup[]> {
    return this.http.get<MandateActionNotificationGroup[]>(
      `${this.api}/GetMandateStatusActionNotificationGroupsByMandateStatusActionId?actionId=${mandateId}`
    );
  }
}

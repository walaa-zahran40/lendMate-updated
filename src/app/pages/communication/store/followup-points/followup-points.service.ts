import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FollowupPoint } from './followup-point.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class FollowupPointsService {
  private api = `${environment.apiUrl}FollowupPoints`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<FollowupPoint>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<FollowupPoint>>(
      `${this.api}/GetAllFollowupPoints`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<FollowupPoint>> {
    return this.http.get<PagedResponse<FollowupPoint>>(
      `${this.api}/GetAllFollowupPointsHistory`
    );
  }

  getById(id: number): Observable<FollowupPoint> {
  return this.http.get<FollowupPoint>(`${this.api}/FollowupPointId`, {
    params: { id: id.toString() }
  });
}


  create(data: Partial<FollowupPoint>): Observable<FollowupPoint> {
    return this.http.post<FollowupPoint>(
      `${this.api}/CreateFollowupPoint`,
      data
    );
  }

  update(id: number, data: Partial<FollowupPoint>): Observable<FollowupPoint> {
    return this.http.put<FollowupPoint>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByCommunicationId(communicationId: number): Observable<FollowupPoint[]> {
  return this.http.get<FollowupPoint[]>(
    `${this.api}/communicationId`,
    { params: { communicationId: communicationId.toString() } }
  );
}
}

